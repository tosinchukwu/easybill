import { useRef } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { InvoiceData, LineItem } from "@/types/invoice";
import { currencySymbols } from "@/types/invoice";

interface Props {
  invoice: InvoiceData;
  onChange: (updates: Partial<InvoiceData>) => void;
  onAddItem: () => void;
  onUpdateItem: (id: string, updates: Partial<LineItem>) => void;
  onRemoveItem: (id: string) => void;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
    {children}
  </div>
);

const InvoiceForm = ({ invoice, onChange, onAddItem, onUpdateItem, onRemoveItem }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ logo: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Logo */}
      <Section title="Logo">
        {invoice.logo ? (
          <div className="relative inline-block">
            <img src={invoice.logo} alt="Logo" className="h-16 rounded-md border object-contain" />
            <button
              onClick={() => onChange({ logo: null })}
              className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex h-20 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
          >
            <Upload className="h-4 w-4" />
            Upload logo
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogo} />
      </Section>

      <Separator />

      {/* Business Details */}
      <Section title="Your Business">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="bname">Business Name</Label>
            <Input id="bname" placeholder="Acme Inc." value={invoice.businessName} onChange={(e) => onChange({ businessName: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="baddr">Address</Label>
            <Textarea id="baddr" placeholder="123 Main St, City, Country" rows={2} value={invoice.businessAddress} onChange={(e) => onChange({ businessAddress: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="bemail">Email</Label>
            <Input id="bemail" type="email" placeholder="you@business.com" value={invoice.businessEmail} onChange={(e) => onChange({ businessEmail: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="bphone">Phone</Label>
            <Input id="bphone" placeholder="+1 234 567 890" value={invoice.businessPhone} onChange={(e) => onChange({ businessPhone: e.target.value })} />
          </div>
        </div>
      </Section>

      <Separator />

      {/* Client Details */}
      <Section title="Bill To">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="cname">Client Name</Label>
            <Input id="cname" placeholder="Client Corp." value={invoice.clientName} onChange={(e) => onChange({ clientName: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="caddr">Address</Label>
            <Textarea id="caddr" placeholder="456 Client Ave, City, Country" rows={2} value={invoice.clientAddress} onChange={(e) => onChange({ clientAddress: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="cemail">Email</Label>
            <Input id="cemail" type="email" placeholder="billing@client.com" value={invoice.clientEmail} onChange={(e) => onChange({ clientEmail: e.target.value })} />
          </div>
        </div>
      </Section>

      <Separator />

      {/* Invoice Meta */}
      <Section title="Invoice Details">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="invnum">Invoice Number</Label>
            <Input id="invnum" value={invoice.invoiceNumber} onChange={(e) => onChange({ invoiceNumber: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select value={invoice.currency} onValueChange={(v) => onChange({ currency: v })}>
              <SelectTrigger id="currency"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.keys(currencySymbols).map((c) => (
                  <SelectItem key={c} value={c}>{c} ({currencySymbols[c]})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="idate">Issue Date</Label>
            <Input id="idate" type="date" value={invoice.issueDate} onChange={(e) => onChange({ issueDate: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="ddate">Due Date</Label>
            <Input id="ddate" type="date" value={invoice.dueDate} onChange={(e) => onChange({ dueDate: e.target.value })} />
          </div>
        </div>
      </Section>

      <Separator />

      {/* Line Items */}
      <Section title="Line Items">
        <div className="space-y-3">
          {invoice.lineItems.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-[1fr_70px_90px_32px] items-end gap-2">
              <div>
                {idx === 0 && <Label className="text-xs">Description</Label>}
                <Input
                  placeholder="Service or product"
                  value={item.description}
                  onChange={(e) => onUpdateItem(item.id, { description: e.target.value })}
                />
              </div>
              <div>
                {idx === 0 && <Label className="text-xs">Qty</Label>}
                <Input
                  type="number"
                  min={0}
                  value={item.quantity}
                  onChange={(e) => onUpdateItem(item.id, { quantity: Number(e.target.value) })}
                />
              </div>
              <div>
                {idx === 0 && <Label className="text-xs">Rate</Label>}
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={item.rate}
                  onChange={(e) => onUpdateItem(item.id, { rate: Number(e.target.value) })}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-destructive"
                onClick={() => onRemoveItem(item.id)}
                disabled={invoice.lineItems.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={onAddItem} className="w-full">
            <Plus className="mr-1 h-4 w-4" /> Add Item
          </Button>
        </div>
      </Section>

      <Separator />

      {/* Tax & Discount */}
      <Section title="Tax & Discount">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="tax">Tax Rate (%)</Label>
            <Input id="tax" type="number" min={0} max={100} step={0.1} value={invoice.taxRate} onChange={(e) => onChange({ taxRate: Number(e.target.value) })} />
          </div>
          <div>
            <Label htmlFor="disc">Discount ({currencySymbols[invoice.currency]})</Label>
            <Input id="disc" type="number" min={0} step={0.01} value={invoice.discount} onChange={(e) => onChange({ discount: Number(e.target.value) })} />
          </div>
        </div>
      </Section>

      <Separator />

      {/* Notes & Terms */}
      <Section title="Notes & Terms">
        <div className="space-y-3">
          <div>
            <Label htmlFor="terms">Payment Terms</Label>
            <Input id="terms" placeholder="Net 30" value={invoice.paymentTerms} onChange={(e) => onChange({ paymentTerms: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Thank you for your business!" rows={3} value={invoice.notes} onChange={(e) => onChange({ notes: e.target.value })} />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default InvoiceForm;
