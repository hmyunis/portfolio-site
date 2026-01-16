import { useState } from 'react';
import MobileMenu from './MobileMenu';

export default function MobileMenuWrapper() {
    const [isOpen, setIsOpen] = useState(false);

    return <MobileMenu isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />;
}
