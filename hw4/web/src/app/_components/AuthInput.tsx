import React from "react";

// Run: npx shadcn-ui@latest add input label
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  setValue: (s: string) => void;
};

function AuthInput({ label, type, value, setValue }: Props) {
  return (
    <div className="w-full">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder="Enter your name"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default AuthInput;
