import { fetchCustomerOptions } from "../data";
import CreateInvoiceForm from "./_components/form";

export default async function CreateInvoicePage() {
  const customers = await fetchCustomerOptions();
  return <CreateInvoiceForm customers={customers} />;
}
