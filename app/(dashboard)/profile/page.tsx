"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Award,
  LogOut,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/lib/profile-context";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, setProfile, setIsOnboarded } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    if (editedProfile) {
      setProfile(editedProfile);
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    setProfile(null as any);
    setIsOnboarded(false);
    router.push("/");
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    general: "General",
    obc: "OBC (Other Backward Class)",
    sc: "SC (Scheduled Caste)",
    st: "ST (Scheduled Tribe)",
    ews: "EWS (Economically Weaker Section)",
    pwd: "PwD (Person with Disability)",
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile information
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl bg-card border border-border mb-6"
      >
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
          <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">
              {profile.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            {isEditing ? (
              <Input
                value={editedProfile?.name || ""}
                onChange={(e) =>
                  setEditedProfile((prev) =>
                    prev ? { ...prev, name: e.target.value } : prev
                  )
                }
                className="text-xl font-bold mb-1 bg-input"
              />
            ) : (
              <h2 className="text-2xl font-bold">{profile.name}</h2>
            )}
            <p className="text-muted-foreground">
              {categoryLabels[profile.category]}
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary">
              <p className="text-sm text-muted-foreground mb-1">Age</p>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedProfile?.age || ""}
                  onChange={(e) =>
                    setEditedProfile((prev) =>
                      prev ? { ...prev, age: parseInt(e.target.value) } : prev
                    )
                  }
                  className="bg-input"
                />
              ) : (
                <p className="font-medium">{profile.age} years</p>
              )}
            </div>
            <div className="p-4 rounded-xl bg-secondary">
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              <p className="font-medium">{profile.category.toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-secondary">
              <p className="text-sm text-muted-foreground mb-1">Degree</p>
              <p className="font-medium text-sm">{profile.degree}</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary">
              <p className="text-sm text-muted-foreground mb-1">Year</p>
              <p className="font-medium">{profile.graduationYear}</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary">
              <p className="text-sm text-muted-foreground mb-1">Percentage</p>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedProfile?.percentage || ""}
                  onChange={(e) =>
                    setEditedProfile((prev) =>
                      prev
                        ? { ...prev, percentage: parseFloat(e.target.value) }
                        : prev
                    )
                  }
                  className="bg-input"
                />
              ) : (
                <p className="font-medium">{profile.percentage}%</p>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
              >
                {skill}
              </span>
            ))}
            {profile.skills.length === 0 && (
              <p className="text-muted-foreground text-sm">No skills added</p>
            )}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.certifications.map((cert) => (
              <span
                key={cert}
                className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium"
              >
                {cert}
              </span>
            ))}
            {profile.certifications.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No certifications added
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Cancel Edit / Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        {isEditing && (
          <Button
            variant="ghost"
            onClick={() => {
              setEditedProfile(profile);
              setIsEditing(false);
            }}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
        )}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </motion.div>
    </div>
  );
}
