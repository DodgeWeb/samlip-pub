// src/pages/pub/[[...slug]].tsx
import React from 'react';
import Link from 'next/link';

export default function PubNotFoundPage() {
    return (
        <div className="min-h-screen bg-cream flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">페이지를 찾을 수 없습니다</h2>
                <p className="text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
                <Link
                    href="/pub/pubindex"
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                >
                    홈으로 돌아가기
                </Link>
            </div>
        </div>
    );
}