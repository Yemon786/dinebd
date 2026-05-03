"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PartnerPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 top-0 w-80 h-80 bg-orange-400 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -left-40 bottom-0 w-80 h-80 bg-primary rounded-full opacity-30 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Join Our Network
              </h1>
              <p className="text-xl text-orange-50 text-pretty leading-relaxed">
                Partner with us and grow your business. Reach thousands of
                hungry customers and increase your revenue with Dinebd's trusted
                delivery platform.
              </p>
              <ul className="space-y-3 text-orange-50">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Easy onboarding process</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Reach millions of customers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Competitive commission rates</span>
                </li>
              </ul>
            </div>

            <div className="hidden md:block">
              <div className="relative h-96">
                <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🍔</div>
                    <p className="text-white text-lg font-semibold">
                      Food at Your Fingertips
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Register Your Business
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below and our team will contact you shortly
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800">Application Received!</h3>
              <p className="text-green-700">
                Thank you for your interest in partnering with Dinebd. Our team will review your
                application and contact you within 2–3 business days.
              </p>
              <p className="text-sm text-green-600">Check your email for a confirmation.</p>
            </div>
          ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-card rounded-lg border border-border p-8"
          >
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Full Name</Label>
                  <Input id="firstName" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" required />
                </div>
              </div>
            </div>

            {/* Business Information Section */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground">
                Business Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="businessName">Restaurant/Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Your Business Name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessType">Type of Business</Label>
                  <select
                    id="businessType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Select a type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="cafe">Café</option>
                    <option value="bakery">Bakery</option>
                    <option value="cloud-kitchen">Cloud Kitchen</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsInBusiness">Years in Business</Label>
                  <Input
                    id="yearsInBusiness"
                    type="number"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDescription">
                  Business Description
                </Label>
                <Textarea
                  id="businessDescription"
                  placeholder="Tell us about your business..."
                  className="min-h-24"
                  required
                />
              </div>
            </div>

            {/* Location Information Section */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground">
                Location Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" placeholder="Street address" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" placeholder="ZIP Code" required />
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground">
                Document Upload
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload required documents to verify your business
              </p>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="businessLicense">Business License</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-accent/50 transition">
                    <svg
                      className="w-8 h-8 text-muted-foreground mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Section */}
            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex items-start gap-3">
                <input
                  id="agreement"
                  type="checkbox"
                  className="mt-1"
                  required
                />
                <Label
                  htmlFor="agreement"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  I agree to the terms and conditions and understand the
                  partnership agreement
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-border pt-6">
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-base font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                We'll review your application and contact you within 2-3
                business days
              </p>
            </div>
          </form>
          )}
        </div>
      </div>
    </main>
  );
}
