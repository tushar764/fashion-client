import { useEffect } from "react";
import { toast } from "react-toastify";

function Alert({ alert }) {
  useEffect(() => {
    if (alert?.msg) {
      const type = alert.type === "danger" ? "error" : alert.type;
      
      toast[type](alert.msg, {
        autoClose: 3000, 
        toastId: alert.msg, 
      });
    }
  }, [alert]); 

  return null;
}

export default Alert;
