(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/components/NavBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
function Navbar() {
    const scrollToSection = (sectionId)=>{
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "w-full fixed top-0 left-0 z-50 flex justify-between items-center py-3 px-4 md:px-10 bg-blue-600 shadow-xl border-b-4 md:border-b-8 border-blue-800",
        style: {
            borderStyle: 'solid'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 md:gap-3 cursor-pointer",
                onClick: ()=>scrollToSection('home'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/logo.jpg",
                        alt: "BedHed Matcha Logo",
                        width: 40,
                        height: 40,
                        className: "md:w-12 md:h-12 rounded-full shadow-lg border-3 md:border-4 border-yellow-400"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/NavBar.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xl md:text-3xl font-bold text-yellow-300 font-[family-name:var(--font-permanent-marker)] drop-shadow-lg",
                        style: {
                            letterSpacing: '0.05em'
                        },
                        children: "BED HED"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/NavBar.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/NavBar.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 md:gap-3 text-sm md:text-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>scrollToSection('home'),
                        className: "px-2 md:px-5 py-1 md:py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-md border-2 md:border-3 border-blue-900 font-[family-name:var(--font-indie-flower)] text-sm md:text-xl",
                        children: "Home"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/NavBar.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>scrollToSection('menu'),
                        className: "px-2 md:px-5 py-1 md:py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-md border-2 md:border-3 border-blue-900 font-[family-name:var(--font-indie-flower)] text-sm md:text-xl",
                        children: "Menu"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/NavBar.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>scrollToSection('about'),
                        className: "px-2 md:px-5 py-1 md:py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-md border-2 md:border-3 border-blue-900 font-[family-name:var(--font-indie-flower)] text-sm md:text-xl hidden sm:block",
                        children: "About"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/NavBar.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>scrollToSection('contact'),
                        className: "px-2 md:px-5 py-1 md:py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-md border-2 md:border-3 border-blue-900 font-[family-name:var(--font-indie-flower)] text-sm md:text-xl hidden sm:block",
                        children: "Contact"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/NavBar.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>scrollToSection('locations'),
                        className: "px-2 md:px-5 py-1 md:py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-md border-2 md:border-3 border-blue-900 font-[family-name:var(--font-indie-flower)] text-sm md:text-xl",
                        children: "Find"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/NavBar.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/NavBar.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/NavBar.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_components_NavBar_tsx_6dbf31cb._.js.map