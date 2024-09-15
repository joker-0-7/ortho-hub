"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import Image from "next/image";

export default function Component() {
  return (
    <div className="contact-us min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <p className="text-muted-foreground">
                The hands-down, sharpest and friendliest education support team
                available to you. We love hearing from our customers and care
                deeply about your concerns and questions. We pride ourselves on
                responding to your message fast and in a manner that will leave
                you excited and grateful that you talked to us. You can send us
                a message about anything. Go ahead, try it!
              </p>
              <div className="space-y-2">
                <a
                  href={process.env.NEXT_PUBLIC_TELEGRAM}
                  target="_blank"
                  className="block"
                >
                  <Button className="w-full" variant="outline">
                    <Send className="mr-2 h-4 w-4" />
                    Contact via Telegram
                  </Button>
                </a>

                <a
                  href={process.env.NEXT_PUBLIC_EMAIL}
                  target="_blank"
                  className="block"
                >
                  <Button className="w-full" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact via Gmail
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex-1 relative">
              <Image
                src="/assets/illustrator/contact.png"
                layout="fill"
                objectFit="fill"
                alt="Contact Us"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
