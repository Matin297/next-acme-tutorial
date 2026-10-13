import CreateInvoiceForm from "./_components/form";
import { fetchCustomerOptions } from "./data";

export default async function CreateInvoicePage() {
  const customers = await fetchCustomerOptions();
  return <CreateInvoiceForm customers={customers} />;
}
