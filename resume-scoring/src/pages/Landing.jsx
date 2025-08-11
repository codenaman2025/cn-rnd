import React from "react";
import { motion } from "framer-motion";
import JobCard from "../components/cards/JobCard";
import LSForm from "../components/form/LSForm";

const Landing = () => {
  const roles = [
    {
      title: "AI Engineer",
      desc: "Build and optimize LLM/RAG systems and AI features.",
    },
    {
      title: "Data Scientist",
      desc: "Deliver insights via experiments, models, and analytics.",
    },
    {
      title: "ML Engineer",
      desc: "Ship models to production with robust MLOps.",
    },
    {
      title: "Full Stack Engineer",
      desc: "Create delightful end-to-end product experiences.",
    },
    {
      title: "Product Manager",
      desc: "Define strategy and drive AI-first roadmaps.",
    },
  ];
  return (
    
      <main className="!pt-2">
        <section className="container !mx-auto  text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Hire smarter with Gen AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="!mt-4 text-lg text-muted-foreground"
          >
            Applicants apply in minutes. Managers shortlist in seconds.
          </motion.p>
          <div className="">
            <LSForm/>
          </div>
       
        </section>
      </main>
    
  );
};

export default Landing;
