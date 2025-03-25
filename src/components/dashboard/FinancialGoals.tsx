import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { differenceInDays, differenceInMonths, format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";

interface Goal {
  title: string;
  current: number;
  target: number;
  progress: number;
  timeLeft: string;
  color: string;
  deadline: string;
}

const fetchFinancialGoals = async () => {
  try {
    const response = await fetch(`${api.baseURL}/api/financial-goals`, {
      headers: {
        ...api.headers,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch financial goals');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching financial goals:', error);
    return [];
  }
};

export const FinancialGoals = () => {
  const { data: fetchedGoals, isLoading } = useQuery({
    queryKey: ['financial-goals'],
    queryFn: fetchFinancialGoals,
    initialData: []
  });

  const [goals, setGoals] = useState<Goal[]>([
    {
      title: "Reach Monthly Sales Target",
      current: 75000,
      target: 100000,
      progress: 75,
      timeLeft: "10 days left",
      color: "bg-emerald-500",
      deadline: "2024-05-01"
    },
    {
      title: "Inventory Management",
      current: 4000,
      target: 10000,
      progress: 40,
      timeLeft: "20 days left",
      color: "bg-blue-500",
      deadline: "2024-05-15"
    },
    {
      title: "Acquire New Diagnostic Tools",
      current: 6000,
      target: 10000,
      progress: 60,
      timeLeft: "1 month left",
      color: "bg-cyan-500",
      deadline: "2024-06-01"
    },
    {
      title: "Expand Showroom Space",
      current: 12500,
      target: 50000,
      progress: 25,
      timeLeft: "2 months left",
      color: "bg-red-500",
      deadline: "2024-07-01"
    }
  ]);

  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: "",
    current: 0,
    target: 0,
    color: "bg-emerald-500",
    deadline: format(new Date(), "yyyy-MM-dd")
  });

  const calculateTimeLeft = (deadline: string) => {
    const today = new Date();
    const targetDate = new Date(deadline);
    const daysLeft = differenceInDays(targetDate, today);
    const monthsLeft = differenceInMonths(targetDate, today);

    if (monthsLeft > 0) {
      return `${monthsLeft} month${monthsLeft > 1 ? 's' : ''} left`;
    }
    return `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return;

    const progress = newGoal.current && newGoal.target 
      ? Math.round((newGoal.current / newGoal.target) * 100)
      : 0;

    const timeLeft = calculateTimeLeft(newGoal.deadline || "");

    setGoals([...goals, {
      title: newGoal.title,
      current: newGoal.current || 0,
      target: newGoal.target || 0,
      progress,
      timeLeft,
      color: newGoal.color || "bg-emerald-500",
      deadline: newGoal.deadline || format(new Date(), "yyyy-MM-dd")
    }]);

    setNewGoal({
      title: "",
      current: 0,
      target: 0,
      color: "bg-emerald-500",
      deadline: format(new Date(), "yyyy-MM-dd")
    });
  };

  const displayGoals = fetchedGoals.length > 0 ? fetchedGoals : goals;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-heading text-center text-teal-600">
          Progress of Financial Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold mb-3">Add New Goal</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              placeholder="Goal Title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Current Amount"
              value={newGoal.current || ""}
              onChange={(e) => setNewGoal({ ...newGoal, current: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Target Amount"
              value={newGoal.target || ""}
              onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
            />
            <Input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            />
            <select
              className="border rounded-md p-2"
              value={newGoal.color}
              onChange={(e) => setNewGoal({ ...newGoal, color: e.target.value })}
            >
              <option value="bg-emerald-500">Green</option>
              <option value="bg-blue-500">Blue</option>
              <option value="bg-cyan-500">Cyan</option>
              <option value="bg-red-500">Red</option>
            </select>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayGoals.map((goal, index) => (
              <div
                key={`${goal.title}-${index}`}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-heading font-semibold text-gray-800">
                    {goal.title}
                  </h3>
                  <span className="text-sm font-medium text-gray-500">
                    {calculateTimeLeft(goal.deadline)}
                  </span>
                </div>
                <div className="mb-2">
                  <Progress
                    value={goal.progress}
                    className="h-2"
                    indicatorClassName={goal.color}
                  />
                </div>
                <div className="text-sm font-medium text-gray-600">
                  ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};