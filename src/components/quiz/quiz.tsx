"use client"

import React, { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

export interface Question {
    id: number
    text: string
    options: string[]
    correctAnswer: number // Index of the correct option
    explanation: string
}

interface QuizProps {
    title?: string
    questions: Question[]
    onComplete?: (score: number) => void
}

export function Quiz({ title, questions, onComplete }: QuizProps) {
    const t = useTranslations("Quiz")
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)

    const currentQuestion = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex) / questions.length) * 100

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return
        setSelectedOption(index)
    }

    const handleSubmit = () => {
        if (selectedOption === null) return

        const isCorrect = selectedOption === currentQuestion.correctAnswer
        if (isCorrect) {
            setScore(score + 1)
            toast.success(t("correct"), { description: t("greatJob") })
        } else {
            toast.error(t("incorrect"), { description: t("reviewExplanation") })
        }
        setIsAnswered(true)
    }

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedOption(null)
            setIsAnswered(false)
        } else {
            setShowResult(true)
            if (onComplete) onComplete(score + (selectedOption === currentQuestion.correctAnswer ? 0 : 0)) // Score already updated
        }
    }

    const handleRetry = () => {
        setCurrentQuestionIndex(0)
        setSelectedOption(null)
        setIsAnswered(false)
        setScore(0)
        setShowResult(false)
    }

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100)
        return (
            <Card className="w-full max-w-2xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">{t("complete")}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                    <div className="relative h-32 w-32 flex items-center justify-center rounded-full border-4 border-primary">
                        <span className="text-3xl font-bold">{percentage}%</span>
                    </div>
                    <p className="text-center text-muted-foreground">
                        {t("score", { score, total: questions.length })}
                    </p>
                    {percentage >= 80 ? (
                        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle>{t("excellent")}</AlertTitle>
                            <AlertDescription>{t("mastered")}</AlertDescription>
                        </Alert>
                    ) : (
                        <Alert className="bg-orange-50 dark:bg-orange-900/20 border-orange-200">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <AlertTitle>{t("keepPracticing")}</AlertTitle>
                            <AlertDescription>{t("review")}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="justify-center">
                    <Button onClick={handleRetry}>{t("retry")}</Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto mt-8">
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <CardTitle>{title || t("title")}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                        {t("questionProgress", { index: currentQuestionIndex + 1, total: questions.length })}
                    </span>
                </div>
                <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-lg font-medium">{currentQuestion.text}</div>

                <RadioGroup value={selectedOption?.toString()} className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors ${selectedOption === index
                                ? "border-primary bg-primary/5"
                                : "hover:bg-muted/50"
                                } ${isAnswered && index === currentQuestion.correctAnswer
                                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                    : ""
                                } ${isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer
                                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                    : ""
                                }`}
                            onClick={() => handleOptionSelect(index)}
                        >
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isAnswered} />
                            <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                                {option}
                            </Label>
                            {isAnswered && index === currentQuestion.correctAnswer && (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                            )}
                            {isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer && (
                                <XCircle className="h-5 w-5 text-red-500" />
                            )}
                        </div>
                    ))}
                </RadioGroup>

                {isAnswered && (
                    <Alert className="bg-muted">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>{t("explanation")}</AlertTitle>
                        <AlertDescription className="mt-2">
                            {currentQuestion.explanation}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
            <CardFooter className="justify-end">
                {!isAnswered ? (
                    <Button onClick={handleSubmit} disabled={selectedOption === null}>
                        {t("checkAnswer")}
                    </Button>
                ) : (
                    <Button onClick={handleNext}>
                        {currentQuestionIndex < questions.length - 1 ? t("nextQuestion") : t("showResults")}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
