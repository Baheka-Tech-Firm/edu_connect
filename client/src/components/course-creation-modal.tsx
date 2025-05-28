import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertCourseSchema, type InsertCourse } from "@shared/schema";
import { CloudUpload } from "lucide-react";

interface CourseCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseCreationModal({ isOpen, onClose }: CourseCreationModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "",
    duration: "",
    imageUrl: "",
  });

  const createCourseMutation = useMutation({
    mutationFn: async (courseData: InsertCourse) => {
      const response = await apiRequest("POST", "/api/courses", courseData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({
        title: "Success",
        description: "Course created successfully!",
      });
      handleClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create course",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const courseData = insertCourseSchema.parse({
        title: formData.title,
        description: formData.description || null,
        level: formData.level as "beginner" | "intermediate" | "advanced",
        duration: formData.duration ? parseInt(formData.duration) : null,
        imageUrl: formData.imageUrl || null,
        teacherId: "", // This will be set on the server
      });
      
      createCourseMutation.mutate(courseData);
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Please check all required fields",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      level: "",
      duration: "",
      imageUrl: "",
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="courseTitle">Course Title *</Label>
              <Input
                id="courseTitle"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Advanced Mathematics"
                required
              />
            </div>

            <div>
              <Label htmlFor="courseDescription">Description</Label>
              <Textarea
                id="courseDescription"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe what students will learn..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="courseLevel">Level *</Label>
                <Select 
                  value={formData.level} 
                  onValueChange={(value) => handleInputChange("level", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="courseDuration">Duration (weeks)</Label>
                <Input
                  id="courseDuration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="12"
                  min="1"
                  max="52"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="courseImage">Course Image URL</Label>
              <Input
                id="courseImage"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <CloudUpload className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-600">
                    <span>Upload a file or enter URL above</span>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createCourseMutation.isPending || !formData.title || !formData.level}
            >
              {createCourseMutation.isPending ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
