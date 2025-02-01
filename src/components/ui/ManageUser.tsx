"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSchema } from "@/data/schema";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { ConfirmDelete } from "./ConfirmDelete";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

type userForm = z.infer<typeof userSchema>;

type ManageUserProps = {
  id: number;
  data: {
    email: string;
    firstName: string;
    lastName: string;
    price: string;
  };
  trigger: React.ReactNode;
};

export function ManageUser({ id, data, trigger }: ManageUserProps) {
  const form = useForm<userForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      price: Number(data.price),
    },
  });

  const { toast } = useToast();
  const [isSubmitting, setSubmitting] = useState(false);

  async function onSubmit(data: userForm) {
    setSubmitting(true);
    try {
      await axios.put(`api/users?id=${id}`, data);
      toast({ variant: "success", title: "User edited successfully!" });
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      toast({ variant: "destructive", title: "Error editing user!" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="4.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="submit" disabled={isSubmitting}>
                  Save Changes {isSubmitting && <Spinner />}
                </Button>
                <ConfirmDelete id={id} />
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
