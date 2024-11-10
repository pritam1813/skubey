import BillingForm from "./BillingForm";

export { BillingForm };

interface AddressFormProps {
  onComplete?: () => void;
}

const AddressForm = ({ onComplete }: AddressFormProps) => {
  const handleSubmit = async (data: any) => {
    // Submit address data
    // If successful:
    console.log(data);

    onComplete?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your address form fields */}
      <input type="text" placeholder="nw" />
      <button type="submit">Submit</button>
    </form>
  );
};

const PaymentForm = ({ onComplete }: AddressFormProps) => {
  const handleSubmit = async (data: any) => {
    // Submit payment data
    // If successful:
    onComplete?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your payment form fields */}
      <input type="text" placeholder="nw" />
      <button type="submit">Submit</button>
    </form>
  );
};

const OrderReview = ({ onComplete }: AddressFormProps) => {
  const handleSubmit = async (data: any) => {
    // Submit order review data
    // If successful:
    onComplete?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your order review fields */}
      <input type="text" placeholder="nw" />
      <button type="submit">Submit</button>
    </form>
  );
};

export { AddressForm, PaymentForm, OrderReview };
