"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DATA } from "@/data/resume"
import { ResumeCard } from "./resume-card"
import Markdown from "react-markdown"
import { useState } from "react"

export function AboutDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="transition-all duration-300 hover:scale-105"
        >
          Learn About Me
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 10
            }}
          >
            <DialogHeader>
              <DialogTitle 
                className="text-2xl font-bold text-center mb-4"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.1, 
                      duration: 0.3,
                      ease: "easeOut",
                    }
                  }}
                >
                  About Me
                </motion.span>
              </DialogTitle>
              <DialogDescription className="sr-only">
                Information about my background, education, and certifications
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-8">
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                className="space-y-4"
              >
                <h3 className="text-xl font-heading">About</h3>
                <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                  {DATA.summary}
                </Markdown>
              </motion.div>

              {/* Education Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                className="space-y-4"
              >
                <h3 className="text-xl font-heading">Education</h3>
                <div className="space-y-3">
                  {DATA.education.map((education) => (
                    <ResumeCard
                      key={education.school}
                      href={education.href}
                      logoUrl={education.logoUrl}
                      altText={education.school}
                      title={education.school}
                      subtitle={education.degree}
                      period={`${education.start} - ${education.end}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Certifications Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                className="space-y-4"
              >
                <h3 className="text-xl font-heading">Certifications</h3>
                <div className="space-y-3">
                  {DATA.certifications.map((certification) => (
                    <ResumeCard
                      key={certification.name}
                      logoUrl={certification.logoUrl}
                      altText={certification.name}
                      title={certification.name}
                      period={`${certification.start} - ${certification.end}`}
                      href={certification.href}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      )}
    </Dialog>
  )
} 