import { useState, useCallback } from "react";
import { Download, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AcknowledgmentDialog from "@/components/invoice/AcknowledgmentDialog";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import type { InvoiceData, LineItem } from "@/types/invoice";
import { defaultInvoice } from "@/types/invoice";

const Index = () => {
  const [acknowledged, setAcknowledged] = useState(
    () => localStorage.getItem("invoice-ack") === "true"
  );
  const [invoice, setInvoice] = useState<InvoiceData>(defaultInvoice);

  const handleAccept = () => {
    localStorage.setItem("invoice-ack", "true");
    setAcknowledged(true);
  };

  const updateInvoice = useCallback((updates: Partial<InvoiceData>) => {
    setInvoice((prev) => ({ ...prev, ...updates }));
  }, []);

  const addItem = useCallback(() => {
    setInvoice((prev) => ({
      ...prev,
      lineItems: [
      ...prev.lineItems,
      { id: Date.now().toString(), description: "", quantity: 1, rate: 0 }]

    }));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<LineItem>) => {
    setInvoice((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) =>
      item.id === id ? { ...item, ...updates } : item
      )
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setInvoice((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((item) => item.id !== id)
    }));
  }, []);

  const handleDownload = () => window.print();

  return (
    <>
      <AcknowledgmentDialog open={!acknowledged} onAccept={handleAccept} />

      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md print:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold tracking-tight">​EazyBill Generator</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary sm:flex">
                <Clock className="h-3.5 w-3.5" />
                Self-destructs in 24h
              </div>
              <Button onClick={handleDownload} size="sm">
                <Download className="mr-1.5 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile: Tabs / Desktop: Side-by-side */}
        <main className="mx-auto max-w-7xl px-4 py-6 print:p-0">
          {/* Mobile */}
          <div className="lg:hidden print:hidden">
            <Tabs defaultValue="form">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="form" className="flex-1">Edit</TabsTrigger>
                <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="form">
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <InvoiceForm
                    invoice={invoice}
                    onChange={updateInvoice}
                    onAddItem={addItem}
                    onUpdateItem={updateItem}
                    onRemoveItem={removeItem} />

                </div>
              </TabsContent>
              <TabsContent value="preview">
                <InvoicePreview invoice={invoice} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop */}
          <div className="hidden gap-6 lg:grid lg:grid-cols-[420px_1fr] print:block">
            <div className="rounded-xl border bg-card p-5 shadow-sm print:hidden">
              <InvoiceForm
                invoice={invoice}
                onChange={updateInvoice}
                onAddItem={addItem}
                onUpdateItem={updateItem}
                onRemoveItem={removeItem} />

            </div>
            <div className="sticky top-20 self-start">
              <InvoicePreview invoice={invoice} />
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default Index;