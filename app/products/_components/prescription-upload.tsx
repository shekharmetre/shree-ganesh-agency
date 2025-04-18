"use client"

import type React from "react"

import { useState } from "react"
import { FileUp, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
import { Input } from "@/components/ui/Input"
import { Label } from "@radix-ui/react-dropdown-menu"

export function PrescriptionUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? "border-primary bg-primary/5" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileUp className="mx-auto h-10 w-10 text-gray-400 mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your prescription here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-4">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
            <div>
              <Label className="sr-only">
                Choose file
              </Label>
              <Input
                id="prescription-upload"
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleChange}
                multiple
              />
              <Button variant="outline" onClick={() => document.getElementById("prescription-upload")?.click()}>
                Browse Files
              </Button>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Uploaded Files</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center space-x-2">
                      <FileUp className="h-4 w-4 text-primary" />
                      <span className="text-sm truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                      <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button disabled={files.length === 0}>Upload Prescription</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
