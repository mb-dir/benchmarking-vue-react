import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import CategoryTile from "@/Components/CategoryTile";

const Index = ({ categories }) => {
    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Wszystkie kategorie
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {(categories || []).map((category) => {
                        return <CategoryTile category={category} />;
                    })}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
