import Link from "next/link";
import Button from "../components/ui/CustomButton";
//import Button from "../components/ui/CustomButton";
import { Scale, Shield, Search, FileText, Users, Brain, CheckCircle, ArrowRight } from "lucide-react"
import { CardContent , Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="min-h-[90vh] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/courthouse.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <Badge className="mb-4">
            Trusted by 1000+ Legal Professionals
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Your Digital Legal Library</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            CaseVault revolutionizes legal document management with AI-powered organization, secure storage, and instant
            accessibility.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="default">
              <Link href="/login">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">Explore Cases</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-muted-foreground">Legal Documents</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-muted-foreground">Law Firms</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Legal Document Management</h2>
            <p className="text-muted-foreground">
              Streamline your legal workflow with our comprehensive suite of tools designed specifically for legal
              professionals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
                <p className="text-muted-foreground">
                  Bank-level encryption ensures your legal documents are protected with the highest security standards.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Search className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
                <p className="text-muted-foreground">
                  Advanced search capabilities let you find any document instantly using keywords, tags, or categories.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <FileText className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Case Management</h3>
                <p className="text-muted-foreground">
                  Organize cases, track progress, and manage documents all in one centralized platform.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Users className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                <p className="text-muted-foreground">
                  Share cases and documents securely with team members and clients while maintaining control.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Brain className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-muted-foreground">
                  Leverage AI to automatically extract key information and generate summaries from legal documents.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Scale className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Legal Compliance</h3>
                <p className="text-muted-foreground">
                  Stay compliant with automatic version control and audit trails for all your legal documents.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How CaseVault Works</h2>
            <p className="text-muted-foreground">Get started with CaseVault in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Documents</h3>
              <p className="text-muted-foreground">
                Simply upload your legal documents in any format. We support PDF, DOCX, and more.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Organize Cases</h3>
              <p className="text-muted-foreground">
                Create collections and categorize your documents with our intuitive interface.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Access Anywhere</h3>
              <p className="text-muted-foreground">
                Access your documents securely from any device, anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Legal Professionals</h2>
            <p className="text-muted-foreground">See what our users have to say about CaseVault</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "CaseVault has transformed how our firm manages legal documents. The AI-powered features save us countless hours.",
                author: "Sarah Johnson",
                role: "Senior Partner, Johnson & Associates",
              },
              {
                quote:
                  "The security features give us peace of mind, and the collaboration tools have improved our team's efficiency.",
                author: "Michael Chen",
                role: "Legal Director, Tech Law Group",
              },
              {
                quote:
                  "As a solo practitioner, CaseVault helps me stay organized and professional. It's like having a digital assistant.",
                author: "Amanda Rodriguez",
                role: "Independent Attorney",
              },
            ].map((testimonial, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find answers to common questions about CaseVault</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we use bank-level encryption to protect your documents. Our servers are hosted in secure
                  facilities, and we maintain strict access controls.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What file types are supported?</AccordionTrigger>
                <AccordionContent>
                  We support all common legal document formats including PDF, DOCX, DOC, XLSX, and more. Files are
                  automatically converted for optimal viewing.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I share documents with clients?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can securely share documents with clients through our platform. You control access
                  permissions and can revoke access at any time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How does the AI summary feature work?</AccordionTrigger>
                <AccordionContent>
                  Our AI automatically analyzes your legal documents to extract key information and generate concise
                  summaries, saving you time in document review.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Legal Practice?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of legal professionals who trust CaseVault for their document management needs.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

