import type { InvoiceData } from "@/types/invoice";
import { calcSubtotal, calcTax, calcTotal, currencySymbols } from "@/types/invoice";

interface Props {
  invoice: InvoiceData;
}

const fmt = (n: number, currency: string) => {
  const sym = currencySymbols[currency] ?? "$";
  return `${sym}${n.toFixed(2)}`;
};

const InvoicePreview = ({ invoice }: Props) => {
  const subtotal = calcSubtotal(invoice.lineItems);
  const tax = calcTax(subtotal, invoice.taxRate);
  const total = calcTotal(subtotal, tax, invoice.discount);

  return (
    <div
      id="invoice-preview"
      className="mx-auto max-w-[700px] rounded-xl border bg-card p-8 shadow-sm print:border-none print:shadow-none"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          {invoice.logo && (
            <img src={invoice.logo} alt="Logo" className="mb-3 h-12 object-contain" />
          )}
          <h2 className="text-lg font-bold text-foreground">
            {invoice.businessName || "Your Business"}
          </h2>
          {invoice.businessAddress && (
            <p className="whitespace-pre-line text-sm text-muted-foreground">{invoice.businessAddress}</p>
          )}
          {invoice.businessEmail && (
            <p className="text-sm text-muted-foreground">{invoice.businessEmail}</p>
          )}
          {invoice.businessPhone && (
            <p className="text-sm text-muted-foreground">{invoice.businessPhone}</p>
          )}
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-black tracking-tight text-primary">INVOICE</h1>
          <p className="mt-1 text-sm font-medium">{invoice.invoiceNumber}</p>
          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            <p>Issued: {invoice.issueDate}</p>
            <p>Due: {invoice.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mt-8 rounded-lg bg-secondary/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bill To</p>
        <p className="mt-1 font-semibold">{invoice.clientName || "Client Name"}</p>
        {invoice.clientAddress && (
          <p className="whitespace-pre-line text-sm text-muted-foreground">{invoice.clientAddress}</p>
        )}
        {invoice.clientEmail && (
          <p className="text-sm text-muted-foreground">{invoice.clientEmail}</p>
        )}
      </div>

      {/* Items Table */}
      <table className="mt-6 w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <th className="pb-2">Description</th>
            <th className="pb-2 text-right">Qty</th>
            <th className="pb-2 text-right">Rate</th>
            <th className="pb-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((item) => (
            <tr key={item.id} className="border-b border-border/50">
              <td className="py-3">{item.description || "—"}</td>
              <td className="py-3 text-right">{item.quantity}</td>
              <td className="py-3 text-right">{fmt(item.rate, invoice.currency)}</td>
              <td className="py-3 text-right font-medium">
                {fmt(item.quantity * item.rate, invoice.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-4 flex justify-end">
        <div className="w-64 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{fmt(subtotal, invoice.currency)}</span>
          </div>
          {invoice.taxRate > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
              <span>{fmt(tax, invoice.currency)}</span>
            </div>
          )}
          {invoice.discount > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-destructive">-{fmt(invoice.discount, invoice.currency)}</span>
            </div>
          )}
          <div className="flex justify-between border-t pt-2 text-base font-bold">
            <span>Total</span>
            <span className="text-primary">{fmt(total, invoice.currency)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {(invoice.paymentTerms || invoice.notes) && (
        <div className="mt-8 space-y-3 border-t pt-4 text-sm text-muted-foreground">
          {invoice.paymentTerms && (
            <div>
              <p className="font-semibold text-foreground">Payment Terms</p>
              <p>{invoice.paymentTerms}</p>
            </div>
          )}
          {invoice.notes && (
            <div>
              <p className="font-semibold text-foreground">Notes</p>
              <p className="whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;
