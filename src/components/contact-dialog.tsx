"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { DATA } from "@/data/resume"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  // Preload the dialog content
  useEffect(() => {
    const preloadDialog = async () => {
      // Create a hidden instance of the dialog to trigger resource loading
      const dialog = document.createElement('div')
      dialog.style.position = 'absolute'
      dialog.style.opacity = '0'
      dialog.style.pointerEvents = 'none'
      document.body.appendChild(dialog)
      
      // Remove after a short delay
      setTimeout(() => {
        document.body.removeChild(dialog)
      }, 1000)
    }
    preloadDialog()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          timestamp: new Date().toISOString(),
          source: window.location.href
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      // Show success toast
      toast({
        variant: "success",
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      })

      // Clear form and close dialog on success
      setFormData({ name: "", email: "", phone: "", message: "" })
      setIsOpen(false)
    } catch (error) {
      console.error('Error sending message:', error)
      // Show error toast
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="default" 
            className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
          >
            Hire Me
          </Button>
        </DialogTrigger>
        {isOpen && (
          <DialogContent className="sm:max-w-[425px] overflow-hidden bg-white dark:bg-background" forceMount>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(8px)" }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                filter: "blur(0px)",
                transition: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.95, 
                y: -10, 
                filter: "blur(8px)",
                transition: {
                  duration: 0.4,
                  ease: [0.32, 0, 0.67, 0],
                }
              }}
            >
              <DialogHeader>
                <DialogTitle>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)",
                      transition: { 
                        delay: 0.1, 
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -10, 
                      filter: "blur(8px)",
                      transition: { 
                        duration: 0.3,
                        ease: [0.32, 0, 0.67, 0],
                      }
                    }}
                    className="text-2xl font-bold text-center"
                  >
                    Get in Touch
                  </motion.h2>
                </DialogTitle>
              </DialogHeader>
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-4 mt-4"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  },
                  exit: {
                    opacity: 0,
                    transition: {
                      staggerChildren: 0.03,
                      staggerDirection: -1,
                      ease: [0.32, 0, 0.67, 0],
                      duration: 0.3
                    }
                  }
                }}
              >
                <motion.div 
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.3
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      y: 20, 
                      filter: "blur(8px)",
                      transition: {
                        duration: 0.2
                      }
                    }
                  }}
                >
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.3
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      y: 20, 
                      filter: "blur(8px)",
                      transition: {
                        duration: 0.2
                      }
                    }
                  }}
                >
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.3
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      y: 20, 
                      filter: "blur(8px)",
                      transition: {
                        duration: 0.2
                      }
                    }
                  }}
                >
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone (optional but recommended)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.3
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      y: 20, 
                      filter: "blur(8px)",
                      transition: {
                        duration: 0.2
                      }
                    }
                  }}
                >
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project"
                    required
                    className="min-h-[100px]"
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.3
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      y: 20, 
                      filter: "blur(8px)",
                      transition: {
                        duration: 0.2
                      }
                    }
                  }}
                >
                  <Button 
                    type="submit" 
                    className="w-full transition-all duration-300 hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>
          </DialogContent>
        )}
      </Dialog>
    </AnimatePresence>
  )
} 