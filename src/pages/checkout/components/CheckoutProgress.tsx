import { CheckoutStep } from '../types';
import Icon from '../../../components/AppIcon';

interface CheckoutProgressProps {
  steps: CheckoutStep[];
  currentStep: number;
}

const CheckoutProgress = ({ steps, currentStep }: CheckoutProgressProps) => {
  return (
    <div className="w-full bg-card rounded-lg p-6 mb-6 shadow-soft">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step.completed
                    ? 'bg-success text-success-foreground'
                    : currentStep === index
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-muted-foreground'
                }`}
              >
                {step.completed ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-medium ${
                    currentStep === index
                      ? 'text-primary'
                      : step.completed
                      ? 'text-success' :'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                  step.completed ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;