export interface HealthMetrics {
    age: number;
    cholesterol: number;
    bloodPressure: string;
    normalBloodPressure: string;
    diabetes: number;
    smoking: boolean;
    kidneyDisease: boolean;
    temperature: number;
    heartRate: number;
  }
  
  export interface FoodRecommendation {
    name: string;
    image: string;
    benefits: string;
    category: 'good' | 'risky';
  }
  
  export type HealthCondition = 'good' | 'moderate' | 'bad';
  
  