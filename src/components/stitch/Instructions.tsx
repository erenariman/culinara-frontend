import React from 'react';

export interface InstructionStepData {
    title: string;
    description: string;
    imageUrl?: string;
}

interface InstructionsProps {
    steps?: InstructionStepData[];
}

export function Instructions({
    steps = []
}: InstructionsProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hazırlanış Adımları</h2>
            <div className="space-y-8">
                {steps.map((step, index) => (
                    <InstructionStep
                        key={index}
                        number={index + 1}
                        title={step.title}
                        description={step.description}
                        imageUrl={step.imageUrl}
                        last={index === steps.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}

interface InstructionStepProps {
    number: number;
    title: string;
    description: string;
    imageUrl?: string;
    last?: boolean;
}

function InstructionStep({ number, title, description, imageUrl, last }: InstructionStepProps) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className={`size-8 rounded-full ${number === 1 ? 'bg-primary text-white' : 'bg-primary/20 text-primary'} flex items-center justify-center font-bold text-sm shrink-0`}>
                    {number}
                </div>
                {!last && <div className="w-0.5 flex-1 bg-gray-100 dark:bg-gray-700 my-2"></div>}
            </div>
            <div className="pb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {description}
                </p>

                {imageUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden aspect-video w-full max-w-md">
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url("${imageUrl}")` }}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
}
