import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin, Printer } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  message: z.string()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { data: logo } = useQuery({
    queryKey: ['logo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('icons')
        .select('photo_url')
        .eq('name', 'logo1')
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: values,
      });

      if (error) throw error;

      toast({
        title: t('message_sent_success'),
        description: t('message_sent_description'),
      });

      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: t('message_sent_error'),
        description: t('message_sent_error_description'),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Google Maps */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">{t('location_title')}</h2>
          <div className="w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1553.953241285284!2d28.943822548558284!3d40.239896931513556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca11446a3f46d5%3A0x2b76598dc60f6156!2zTWFrcGHFnw!5e1!3m2!1str!2ses!4v1732628839154!5m2!1str!2ses"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6">{t('contact_form_title')}</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('name_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('name_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('email_placeholder')} type="email" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('message_label')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t('message_placeholder')}
                          required
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {t('send_message')}
                </Button>
              </form>
            </Form>
          </div>

          {/* Company Information */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6">{t('contact_info_title')}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1" />
                <p>{t('company_address')}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary" />
                <p>{t('company_phone')}</p>
              </div>
              <div className="flex items-center gap-3">
                <Printer className="text-primary" />
                <p>{t('company_fax')}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-primary" />
                <a href="mailto:makpas@makpas.com" className="hover:text-primary">{t('company_email')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;