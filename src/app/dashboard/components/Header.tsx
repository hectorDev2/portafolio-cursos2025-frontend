
'use client'

import { useState } from 'react';
import { BookOpenCheck, ChevronDown, LogOut, Settings } from 'lucide-react';

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
      <header className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 md:px-6 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <BookOpenCheck className="h-7 w-7 text-blue-600" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Portfolio Maestro
          </h1>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="relative h-9 w-9 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="font-bold text-white">DH</span>
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Dr. Héctor
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Docente</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500 hidden md:block" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-2">
                <div className="px-2 py-1">
                  <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                    Dr. Héctor
                  </p>
                  <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                    hector@university.edu
                  </p>
                </div>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button className="w-full text-left flex items-center px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </button>
                <button className="w-full text-left flex items-center px-2 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  };
