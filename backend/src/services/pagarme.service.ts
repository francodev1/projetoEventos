import axios from 'axios';

interface CreditCardData {
  number: string;
  holder_name: string;
  exp_month: number;
  exp_year: number;
  cvv: string;
}

interface CustomerData {
  name: string;
  email: string;
  document: string;
  document_type: string;
  phone: {
    country_code: string;
    area_code: string;
    number: string;
  };
}

interface SplitRule {
  recipient_id: string;
  percentage: number;
  liable: boolean;
  charge_processing_fee: boolean;
}

interface CreateTransactionParams {
  amount: number; // em centavos (ex: 5000 = R$ 50,00)
  description: string;
  creditCard: CreditCardData;
  customer: CustomerData;
  organizerRecipientId: string;
  metadata?: Record<string, any>;
}

class PagarmeService {
  private apiKey: string;
  private baseUrl: string = 'https://api.pagar.me/core/v5';
  private platformRecipientId: string;

  constructor() {
    this.apiKey = process.env.PAGARME_API_KEY || '';
    this.platformRecipientId = process.env.PAGARME_PLATFORM_RECIPIENT_ID || '';

    if (!this.apiKey) {
      throw new Error('PAGARME_API_KEY não configurada');
    }
    if (!this.platformRecipientId) {
      throw new Error('PAGARME_PLATFORM_RECIPIENT_ID não configurada');
    }
  }

  /**
   * Cria uma transação com split de pagamento
   * 3% para a plataforma, 97% para o organizador
   */
  async createTransactionWithSplit(params: CreateTransactionParams) {
    const {
      amount,
      description,
      creditCard,
      customer,
      organizerRecipientId,
      metadata = {}
    } = params;

    // Calcula o split: 3% plataforma, 97% organizador
    const platformPercentage = 3;
    const organizerPercentage = 97;

    const splitRules: SplitRule[] = [
      {
        recipient_id: organizerRecipientId,
        percentage: organizerPercentage,
        liable: true, // Organizador arca com chargebacks
        charge_processing_fee: true // Organizador paga taxa de processamento
      },
      {
        recipient_id: this.platformRecipientId,
        percentage: platformPercentage,
        liable: false,
        charge_processing_fee: false
      }
    ];

    const payload = {
      items: [
        {
          amount: amount,
          description: description,
          quantity: 1
        }
      ],
      customer: {
        name: customer.name,
        email: customer.email,
        document: customer.document,
        document_type: customer.document_type,
        type: 'individual',
        phones: {
          mobile_phone: customer.phone
        }
      },
      payments: [
        {
          payment_method: 'credit_card',
          credit_card: {
            card: {
              number: creditCard.number,
              holder_name: creditCard.holder_name,
              exp_month: creditCard.exp_month,
              exp_year: creditCard.exp_year,
              cvv: creditCard.cvv
            }
          },
          split: splitRules
        }
      ],
      metadata: metadata
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/orders`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        transactionId: response.data.id,
        status: response.data.status,
        data: response.data
      };
    } catch (error: any) {
      console.error('Erro ao criar transação no Pagar.me:', error.response?.data || error.message);
      
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao processar pagamento',
        details: error.response?.data
      };
    }
  }

  /**
   * Consulta status de uma transação
   */
  async getTransaction(transactionId: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/orders/${transactionId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      console.error('Erro ao consultar transação:', error.response?.data || error.message);
      
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao consultar transação'
      };
    }
  }

  /**
   * Cria um recipient (recebedor) no Pagar.me
   * Necessário para organizadores receberem os pagamentos
   */
  async createRecipient(data: {
    name: string;
    email: string;
    document: string;
    type: 'individual' | 'company';
    bankAccount: {
      bank: string;
      branch_number: string;
      account_number: string;
      account_check_digit: string;
      holder_name: string;
      holder_document: string;
      type: 'checking' | 'savings';
    };
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/recipients`,
        {
          name: data.name,
          email: data.email,
          document: data.document,
          type: data.type,
          default_bank_account: data.bankAccount
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        recipientId: response.data.id,
        data: response.data
      };
    } catch (error: any) {
      console.error('Erro ao criar recipient:', error.response?.data || error.message);
      
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao criar recebedor'
      };
    }
  }
}

export default new PagarmeService();
