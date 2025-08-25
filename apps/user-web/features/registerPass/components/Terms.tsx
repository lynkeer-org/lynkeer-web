import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@lynkeer/ui/components/accordion";

function Terms() {
  return (
    <div className="mt-4 border rounded-md px-2">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="terms">
          <AccordionTrigger className="font-medium text-md">Condiciones del servicio</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
              <li>Presenta la tarjeta antes de pagar.</li>
              <li>Acumulas un sello por cada compra.</li>
              <li>Puedes obtener un premio luego de acumular la cantidad de sellos requeridos en la tarjeta.</li>
              <li>Los sellos no se pueden transferir ni canjear por dinero.</li>
              <li> La tarjeta puede ser cancelada por uso indebido.</li>
              <li>Consiento que mis datos personales sean utilizados para ofertas personalizadas.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export { Terms };
