import React from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Image } from "@/components/ui/image";
const base = "https://yugouortjdtblrbmuhnu.supabase.co/storage/v1/object/public/balvan-images/images/assets/";
export default function OrganicVisual() {
  return <div className="relative mx-auto aspect-square w-full max-w-[440px]">
    <div className="absolute inset-0 rounded-full border-2 border-leaf/30" /><div className="absolute inset-3 rounded-full border border-leaf/20" />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-lift"><Image src={`${base}071cde10a_generated_image.webp`} alt="Farmer in field at golden hour" className="h-full w-full object-cover" /></motion.div>
    <motion.div initial={{ opacity: 0, scale: 0.9, x: -10 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} className="absolute left-0 top-2 h-[42%] w-[42%] overflow-hidden rounded-full border-4 border-background shadow-soft"><Image src={`${base}304bb49c1_generated_image.webp`} alt="Young seedling in soil" className="h-full w-full object-cover" /></motion.div>
    <motion.div initial={{ opacity: 0, scale: 0.9, x: 10 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="absolute bottom-2 right-0 h-[44%] w-[44%] overflow-hidden rounded-full border-4 border-background shadow-soft"><Image src={`${base}392c68d31_generated_image.webp`} alt="Hands holding a young plant" className="h-full w-full object-cover" /></motion.div>
    <motion.div animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -right-2 top-8 text-leaf/50"><Leaf className="h-7 w-7" /></motion.div><motion.div animate={{ y: [0, 6, 0], rotate: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="absolute -left-1 bottom-12 text-leaf/40"><Leaf className="h-6 w-6" /></motion.div>
  </div>;
}