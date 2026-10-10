import { motion } from "framer-motion";

export default function Sucesso({ mensgem }) {
   return (
      <div className="sucesso">
         <div className="face">
            <div className="container-box-sucesso">
               <svg className="iconeSucesso" viewBox="0 0 100 100" width="150px"
                  height="150px">

                  {/* Círculo */}
                  <motion.circle
                     cx="50"
                     cy="50"
                     r="45"
                     fill="none"
                     stroke="#00f5d4"
                     strokeWidth="3"
                     pathLength="1"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{
                        duration: 1.5
                     }}
                  />

                  {/* ✓ */}
                  <motion.path
                     d="M30 50 L43 63 L70 35"
                     fill="none"
                     stroke="#00f5d4"
                     strokeWidth="5"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     pathLength="1"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{
                        delay: 2,
                        duration: 0.2
                     }}
                  />

               </svg>

               {/* Texto */}
               <motion.div
                  initial={{
                     opacity: 0,
                     scale: 0.8
                  }}
                  animate={{
                     opacity: 1,
                     scale: 1
                  }}
                  transition={{
                     delay: 2.5,
                     duration: 0.1
                  }}
               >
                  <p className="sucesso-h1"> {mensgem}</p>
               </motion.div>
            </div>
         </div>
      </div>
   )
}