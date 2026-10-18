import { notFound } from "next/navigation";
import { fetchCustomerOptions, fetchInvoiceById } from "../../data";
import EditInvoiceForm from "./_components/form";

export default async function EditInvoice({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [customers, invoice] = await Promise.all([
    fetchCustomerOptions(),
    fetchInvoiceById(id),
  ]);

  if (!invoice) {
    notFound();
  }

  return <EditInvoiceForm invoice={invoice} customers={customers} />;
}
