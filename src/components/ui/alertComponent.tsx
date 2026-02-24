import { Alert, AlertDescription, AlertTitle } from "@/components/ui/subComponents/alert";
import type { AlertType } from "@/types/types";


const AlertComponent = ({ title, description }: AlertType) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-fit">
      <Alert>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertComponent;
