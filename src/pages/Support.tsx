
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageSquare, SendIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/layout/DashboardLayout";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Support = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real application, this would send data to a backend service
    console.log("Form submitted:", data);
    
    // Show success message
    toast.success("Your message has been sent! We'll get back to you soon.");
    
    // Reset form
    form.reset();
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Contact Support</h1>
            <p className="text-gray-400">
              Have questions or issues? Our team is here to help. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          
          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-sportbet-gray rounded-lg p-6 border border-sportbet-light-gray flex flex-col items-center text-center">
              <div className="bg-sportbet-blue/20 rounded-full p-4 mb-4">
                <Mail className="h-6 w-6 text-sportbet-blue" />
              </div>
              <h3 className="font-medium text-white mb-2">Email Us</h3>
              <p className="text-gray-400 mb-4">For general inquiries and support</p>
              <a 
                href="mailto:support@sportbet-ai.com" 
                className="text-sportbet-blue hover:text-sportbet-blue/80 font-medium"
              >
                support@sportbet-ai.com
              </a>
            </div>
            
            <div className="bg-sportbet-gray rounded-lg p-6 border border-sportbet-light-gray flex flex-col items-center text-center">
              <div className="bg-sportbet-green/20 rounded-full p-4 mb-4">
                <MessageSquare className="h-6 w-6 text-sportbet-green" />
              </div>
              <h3 className="font-medium text-white mb-2">Live Chat</h3>
              <p className="text-gray-400 mb-4">Available Monday to Friday, 9am to 5pm UTC</p>
              <Button 
                variant="outline" 
                className="border-sportbet-green text-sportbet-green hover:bg-sportbet-green/10"
                onClick={() => toast.info("Live chat will be available soon!")}
              >
                Start Chat
              </Button>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-sportbet-gray rounded-lg p-6 border border-sportbet-light-gray">
            <h2 className="text-xl font-medium text-white mb-6">Send Us a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="bg-sportbet-dark border-sportbet-light-gray text-white" 
                            {...field} 
                          />
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
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email address" 
                            type="email" 
                            className="bg-sportbet-dark border-sportbet-light-gray text-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="What's this about?" 
                          className="bg-sportbet-dark border-sportbet-light-gray text-white" 
                          {...field} 
                        />
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
                      <FormLabel className="text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us how we can help..." 
                          className="bg-sportbet-dark border-sportbet-light-gray text-white min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Please provide as much detail as possible so we can best assist you.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="bg-sportbet-blue hover:bg-sportbet-blue/80 text-white w-full md:w-auto"
                >
                  <SendIcon className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-sm text-gray-400">
              <p>
                By submitting this form, you agree to our <a href="/terms" className="text-sportbet-blue hover:underline">Terms of Service</a> and <a href="/privacy" className="text-sportbet-blue hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10 text-gray-400">
            <p>
              For urgent issues, please contact us directly at support@sportbet-ai.com
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
