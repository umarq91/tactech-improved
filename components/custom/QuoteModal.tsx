"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { sendEmail } from "@/lib/utils";

type QuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const message = {
        user_name: formData.name,
        user_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };
      const response = await sendEmail(message);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up animations and scroll lock
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      document.body.style.overflow = "auto";
    };
  }, []);

  // Animation setup
  useGSAP(
    () => {
      gsap.set(".modal-form > *", { y: 20, opacity: 0 });
      gsap.set(".modal-close-btn", { y: -20, opacity: 0 });
      gsap.set(".modal-bg", { scale: 0.95, opacity: 0 });
    },
    { scope: modalRef }
  );

  // Main animation control
  useEffect(() => {
    if (!modalRef.current) return;

    // Kill any existing animations
    if (animationRef.current) {
      animationRef.current.kill();
    }

    if (isOpen) {
      // Lock scroll
      document.body.style.overflow = "hidden";
      
      // Create new timeline
      animationRef.current = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          // Ensure modal is fully interactive after animation
          if (modalRef.current) {
            modalRef.current.style.pointerEvents = "auto";
          }
        }
      });

      animationRef.current
        .to(modalRef.current, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3
        })
        .fromTo(
          ".modal-bg",
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
          0
        )
        .to(
          ".modal-form > *",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08
          },
          0.3
        )
        .to(
          ".modal-close-btn",
          {
            y: 0,
            opacity: 1,
            duration: 0.4
          },
          0.5
        );
    } else {
      // Create closing timeline
      animationRef.current = gsap.timeline({
        defaults: { ease: "power2.in" },
        onComplete: () => {
          // Reset scroll lock
          document.body.style.overflow = "auto";
          // Ensure modal is fully hidden after animation
          if (modalRef.current) {
            modalRef.current.style.pointerEvents = "none";
          }
        }
      });

      animationRef.current
        .to(".modal-form > *", {
          y: 20,
          opacity: 0,
          duration: 0.2,
          stagger: -0.05
        })
        .to(
          ".modal-close-btn",
          { y: -20, opacity: 0, duration: 0.2 },
          0
        )
        .to(
          ".modal-bg",
          { scale: 0.95, opacity: 0, duration: 0.3 },
          0
        )
        .to(
          modalRef.current,
          { opacity: 0, duration: 0.3 },
          0.2
        );
    }
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 opacity-0 pointer-events-none"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative w-full max-w-2xl">
        {/* Animated background element */}
        <div className="modal-bg absolute -inset-2 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl shadow-2xl" />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative bg-background border border-border/50 rounded-lg shadow-lg overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="modal-close-btn absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="border-b border-border/50 p-6 pb-4">
            <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
            <p className="text-muted-foreground mt-1">
              Fill out the form below and we'll get back to you soon
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="modal-form p-6 space-y-6">
            {/* ... rest of your form JSX remains the same ... */}
            {submitStatus === "success" ? (
              <div className="py-8 text-center">
                <div className="text-green-500 text-2xl font-medium mb-2">
                  Thank you!
                </div>
                <p className="text-muted-foreground">
                  Your message has been sent successfully. We'll contact you
                  soon.
                </p>
              </div>
            ) : submitStatus === "error" ? (
              <div className="py-8 text-center">
                <div className="text-red-500 text-2xl font-medium mb-2">
                  Something went wrong
                </div>
                <p className="text-muted-foreground">
                  Please try again later or contact us directly.
                </p>
                <Button
                  type="button"
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name*</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject*</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message*</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full px-8 py-6 text-md font-medium hover:shadow-lg hover:shadow-primary/10 transition-all"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}