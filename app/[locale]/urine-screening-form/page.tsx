'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function UrineScreeningFormPage() {
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        router.replace(`/${locale}/booking?service=urinalysis`);
    }, [router, locale]);

    return null;
}
