(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/components/home/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SideBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-client] (ecmascript) <export default as CircleUser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
;
;
;
;
;
function SideBar(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "77ae5ecdd02c6f965a1f2d311bb8988b6dca073f69309459a27c46c7e2fbe705") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "77ae5ecdd02c6f965a1f2d311bb8988b6dca073f69309459a27c46c7e2fbe705";
    }
    const { isLoggedIn, user } = t0;
    let t1;
    if ($[1] !== isLoggedIn || $[2] !== user) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card w-full bg-accent shadow-sm border border-border overflow-hidden rounded-[15px]",
            children: isLoggedIn && user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-20 shrink-0 rounded-t-[8px] overflow-hidden bg-primary",
                        children: user.banner_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: user.banner_url,
                            alt: "Banni\xE8re",
                            fill: true,
                            className: "object-cover",
                            sizes: "(max-width: 400px) 100vw, 400px"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                            lineNumber: 20,
                            columnNumber: 244
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                        lineNumber: 20,
                        columnNumber: 135
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-body pt-0 px-4 pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end gap-3 -mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-18 h-18 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden z-10 text-base-content/70",
                                        children: user.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: user.avatar_url,
                                            alt: "Avatar",
                                            width: 65,
                                            height: 65,
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                            lineNumber: 20,
                                            columnNumber: 649
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUser$3e$__["CircleUser"], {
                                            size: 50,
                                            strokeWidth: 1.5
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                            lineNumber: 20,
                                            columnNumber: 758
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                        lineNumber: 20,
                                        columnNumber: 472
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-bold text-base truncate",
                                                children: user.username
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                                lineNumber: 20,
                                                columnNumber: 839
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-border",
                                                children: [
                                                    "@",
                                                    user.username
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                                lineNumber: 20,
                                                columnNumber: 902
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                        lineNumber: 20,
                                        columnNumber: 807
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                lineNumber: 20,
                                columnNumber: 428
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 p-2 rounded-[8px] bg-muted border border-border",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-2 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xl font-bold",
                                                    children: "0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                                    lineNumber: 20,
                                                    columnNumber: 1096
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-black/70",
                                                    children: "Oeuvres"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                                    lineNumber: 20,
                                                    columnNumber: 1134
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                            lineNumber: 20,
                                            columnNumber: 1091
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xl font-bold",
                                                    children: "0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                                    lineNumber: 20,
                                                    columnNumber: 1193
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-black/70",
                                                    children: "Amis"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                                    lineNumber: 20,
                                                    columnNumber: 1231
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                            lineNumber: 20,
                                            columnNumber: 1188
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xl font-bold",
                                                    children: "0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                                    lineNumber: 20,
                                                    columnNumber: 1287
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-black/70",
                                                    children: "Posts"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                                    lineNumber: 20,
                                                    columnNumber: 1325
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                            lineNumber: 20,
                                            columnNumber: 1282
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                    lineNumber: 20,
                                    columnNumber: 1039
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                lineNumber: 20,
                                columnNumber: 969
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                        lineNumber: 20,
                        columnNumber: 386
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-body flex justify-center w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/login",
                        className: "flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary",
                        children: "Se connecter"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                        lineNumber: 20,
                        columnNumber: 1455
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "flex justify-center p-2",
                        children: "ou"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                        lineNumber: 20,
                        columnNumber: 1588
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/register",
                        className: "flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary",
                        children: "S'inscrire"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                        lineNumber: 20,
                        columnNumber: 1633
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                lineNumber: 20,
                columnNumber: 1401
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Sidebar.tsx",
            lineNumber: 20,
            columnNumber: 10
        }, this);
        $[1] = isLoggedIn;
        $[2] = user;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] !== isLoggedIn) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card w-full bg-accent shadow-sm place-items-center border border-border rounded-[15px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-body flex justify-center w-full",
                children: isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                            lineNumber: 29,
                            columnNumber: 210
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: " Activité amis"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                            lineNumber: 29,
                            columnNumber: 229
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/home/Sidebar.tsx",
                    lineNumber: 29,
                    columnNumber: 182
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            className: "flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary",
                            children: "Se connecter"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                            lineNumber: 29,
                            columnNumber: 284
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "flex justify-center p-2",
                            children: "ou"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                            lineNumber: 29,
                            columnNumber: 417
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/register",
                            className: "flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary",
                            children: "S'inscrire"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/home/Sidebar.tsx",
                            lineNumber: 29,
                            columnNumber: 462
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/home/Sidebar.tsx",
                    lineNumber: 29,
                    columnNumber: 279
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                lineNumber: 29,
                columnNumber: 114
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Sidebar.tsx",
            lineNumber: 29,
            columnNumber: 10
        }, this);
        $[4] = isLoggedIn;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card w-full bg-accent shadow-sm place-items-center border border-border rounded-[15px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-body flex justify-center w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                lineNumber: 37,
                                columnNumber: 196
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-sm",
                                children: "Top Mangas"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                lineNumber: 37,
                                columnNumber: 215
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                        lineNumber: 37,
                        columnNumber: 168
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "A remplir quand on aura l'API"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                        lineNumber: 37,
                        columnNumber: 260
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                lineNumber: 37,
                columnNumber: 114
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Sidebar.tsx",
            lineNumber: 37,
            columnNumber: 10
        }, this);
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card w-full bg-accent shadow-sm place-items-center border border-border rounded-[15px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-body flex justify-center w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                lineNumber: 44,
                                columnNumber: 196
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-sm",
                                children: "Top Anime"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                                lineNumber: 44,
                                columnNumber: 215
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                        lineNumber: 44,
                        columnNumber: 168
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "A remplir quand on aura l'API"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/home/Sidebar.tsx",
                        lineNumber: 44,
                        columnNumber: 259
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/home/Sidebar.tsx",
                lineNumber: 44,
                columnNumber: 114
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Sidebar.tsx",
            lineNumber: 44,
            columnNumber: 10
        }, this);
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] !== t1 || $[9] !== t2) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5",
            children: [
                t1,
                t2,
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/Sidebar.tsx",
            lineNumber: 51,
            columnNumber: 10
        }, this);
        $[8] = t1;
        $[9] = t2;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    return t5;
}
_c = SideBar;
var _c;
__turbopack_context__.k.register(_c, "SideBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/PostCards.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostCards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-client] (ecmascript) <export default as CircleUser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-client] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$fr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/fr.js [app-client] (ecmascript)");
;
;
;
;
;
;
function PostCards(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(28);
    if ($[0] !== "25a620ec8c63c1c6e3ad717aac4f79430047d14b7e008760a139138ec27edda7") {
        for(let $i = 0; $i < 28; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "25a620ec8c63c1c6e3ad717aac4f79430047d14b7e008760a139138ec27edda7";
    }
    const { post } = t0;
    const t1 = post.id;
    let t2;
    if ($[1] !== post.avatar_url) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: post.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: post.avatar_url,
                alt: "Avatar",
                width: 100,
                height: 100,
                className: "w-12 h-12 rounded-full"
            }, void 0, false, {
                fileName: "[project]/src/app/components/PostCards.tsx",
                lineNumber: 20,
                columnNumber: 34
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUser$3e$__["CircleUser"], {
                    size: 35,
                    strokeWidth: 1.5
                }, void 0, false, {
                    fileName: "[project]/src/app/components/PostCards.tsx",
                    lineNumber: 20,
                    columnNumber: 294
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/PostCards.tsx",
                lineNumber: 20,
                columnNumber: 141
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 20,
            columnNumber: 10
        }, this);
        $[1] = post.avatar_url;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    let t4;
    if ($[3] !== post.username) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-bold",
            children: post.username
        }, void 0, false, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 29,
            columnNumber: 10
        }, this);
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-border",
            children: [
                "@",
                post.username
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 30,
            columnNumber: 10
        }, this);
        $[3] = post.username;
        $[4] = t3;
        $[5] = t4;
    } else {
        t3 = $[4];
        t4 = $[5];
    }
    let t5;
    if ($[6] !== post.updated_at) {
        t5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(post.updated_at), {
            locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$fr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fr"]
        });
        $[6] = post.updated_at;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-border",
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 50,
            columnNumber: 10
        }, this);
        $[8] = t5;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== t3 || $[11] !== t4 || $[12] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: [
                t3,
                t4,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 58,
            columnNumber: 10
        }, this);
        $[10] = t3;
        $[11] = t4;
        $[12] = t6;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== post.content) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: post.content
        }, void 0, false, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        $[14] = post.content;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/app/components/PostCards.tsx",
                    lineNumber: 76,
                    columnNumber: 38
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "0"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/PostCards.tsx",
                    lineNumber: 76,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 76,
            columnNumber: 10
        }, this);
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/app/components/PostCards.tsx",
                    lineNumber: 83,
                    columnNumber: 39
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "0"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/PostCards.tsx",
                    lineNumber: 83,
                    columnNumber: 66
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 83,
            columnNumber: 11
        }, this);
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    let t11;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: [
                t9,
                t10,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/PostCards.tsx",
                        lineNumber: 90,
                        columnNumber: 76
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/components/PostCards.tsx",
                    lineNumber: 90,
                    columnNumber: 48
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 90,
            columnNumber: 11
        }, this);
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    let t12;
    if ($[19] !== t7 || $[20] !== t8) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t7,
                t8,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 97,
            columnNumber: 11
        }, this);
        $[19] = t7;
        $[20] = t8;
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    let t13;
    if ($[22] !== t12 || $[23] !== t2) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-3",
            children: [
                t2,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 106,
            columnNumber: 11
        }, this);
        $[22] = t12;
        $[23] = t2;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] !== post.id || $[26] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-accent shadow-sm place-items-center w-full border border-border rounded-[15px] p-6",
            children: t13
        }, t1, false, {
            fileName: "[project]/src/app/components/PostCards.tsx",
            lineNumber: 115,
            columnNumber: 11
        }, this);
        $[25] = post.id;
        $[26] = t13;
        $[27] = t14;
    } else {
        t14 = $[27];
    }
    return t14;
}
_c = PostCards;
var _c;
__turbopack_context__.k.register(_c, "PostCards");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/home/PostList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-client] (ecmascript) <export default as CircleUser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SendHorizonal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send-horizontal.js [app-client] (ecmascript) <export default as SendHorizonal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smile.js [app-client] (ecmascript) <export default as Smile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$PostCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/PostCards.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PostList(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(37);
    if ($[0] !== "7d6b27e37dafae4adf49f086cc5b4b6b5e0daec02556a5df5602f7306f15bbc0") {
        for(let $i = 0; $i < 37; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7d6b27e37dafae4adf49f086cc5b4b6b5e0daec02556a5df5602f7306f15bbc0";
    }
    const { isLoggedIn, user } = t0;
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            {
                id: 1,
                avatar_url: "/logo.png",
                username: "John Doe",
                content: "Bonjour, comment \xE7a va ?",
                created_at: "2026-03-10T12:00:00.000000Z",
                updated_at: "2026-03-10T12:00:00.000000Z"
            },
            {
                id: 2,
                avatar_url: "",
                username: "Jane Doe",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                created_at: "2026-02-25T12:00:00.000000Z",
                updated_at: "2026-02-25T12:00:00.000000Z"
            },
            {
                id: 3,
                avatar_url: "",
                username: "Jane Doe",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                created_at: "2026-02-25T12:00:00.000000Z",
                updated_at: "2026-02-25T12:00:00.000000Z"
            },
            {
                id: 4,
                avatar_url: "",
                username: "Jane Doe",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                created_at: "2026-02-25T12:00:00.000000Z",
                updated_at: "2026-02-25T12:00:00.000000Z"
            },
            {
                id: 5,
                avatar_url: "",
                username: "Jane Doe",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                created_at: "2026-02-25T12:00:00.000000Z",
                updated_at: "2026-02-25T12:00:00.000000Z"
            },
            {
                id: 6,
                avatar_url: "/logo.png",
                username: "Jane Doe",
                content: "Je suis content de voir que vous \xEAtes de retour !",
                created_at: "2026-02-20T12:00:00.000000Z",
                updated_at: "2026-02-20T12:00:00.000000Z"
            }
        ];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const posts = t1;
    let t2;
    if ($[2] !== isLoggedIn || $[3] !== user) {
        t2 = isLoggedIn && user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col bg-accent border border-border rounded-[15px] gap-2 px-6 py-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-12 h-12 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70",
                        children: user.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: user.avatar_url,
                            alt: "Avatar",
                            width: 35,
                            height: 35,
                            className: "w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/home/PostList.tsx",
                            lineNumber: 74,
                            columnNumber: 324
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUser$3e$__["CircleUser"], {
                            size: 35,
                            strokeWidth: 1.5
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/home/PostList.tsx",
                            lineNumber: 74,
                            columnNumber: 433
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/home/PostList.tsx",
                        lineNumber: 74,
                        columnNumber: 152
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Partage ton avis sur un manga, un anime, etc",
                                    className: "input text-border input-ghost w-full h-10"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/home/PostList.tsx",
                                    lineNumber: 74,
                                    columnNumber: 531
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/home/PostList.tsx",
                                lineNumber: 74,
                                columnNumber: 526
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/home/PostList.tsx",
                                                lineNumber: 74,
                                                columnNumber: 748
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/home/PostList.tsx",
                                                lineNumber: 74,
                                                columnNumber: 771
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/home/PostList.tsx",
                                        lineNumber: 74,
                                        columnNumber: 715
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn btn-ghost px-4 border border-border text-border rounded-[15px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SendHorizonal$3e$__["SendHorizonal"], {
                                                size: 17
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/home/PostList.tsx",
                                                lineNumber: 74,
                                                columnNumber: 883
                                            }, this),
                                            " Poster"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/home/PostList.tsx",
                                        lineNumber: 74,
                                        columnNumber: 796
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/home/PostList.tsx",
                                lineNumber: 74,
                                columnNumber: 671
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/home/PostList.tsx",
                        lineNumber: 74,
                        columnNumber: 482
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/home/PostList.tsx",
                lineNumber: 74,
                columnNumber: 124
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 74,
            columnNumber: 31
        }, this) : null;
        $[2] = isLoggedIn;
        $[3] = user;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== filter) {
        t3 = ({
            "PostList[<button>.onClick]": ()=>{
                if (filter === "trends") {
                    setFilter("all");
                } else {
                    setFilter("trends");
                }
            }
        })["PostList[<button>.onClick]"];
        $[5] = filter;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const t4 = `flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === "trends" ? "bg-alerts text-white" : "text-border"}`;
    let t5;
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 101,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "hidden md:inline",
            children: "Tendances"
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 102,
            columnNumber: 10
        }, this);
        $[7] = t5;
        $[8] = t6;
    } else {
        t5 = $[7];
        t6 = $[8];
    }
    let t7;
    if ($[9] !== t3 || $[10] !== t4) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t3,
            className: t4,
            children: [
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 111,
            columnNumber: 10
        }, this);
        $[9] = t3;
        $[10] = t4;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== filter) {
        t8 = ({
            "PostList[<button>.onClick]": ()=>{
                if (filter === "recent") {
                    setFilter("all");
                } else {
                    setFilter("recent");
                }
            }
        })["PostList[<button>.onClick]"];
        $[12] = filter;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    const t9 = `flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === "recent" ? "bg-alerts text-white" : "text-border"}`;
    let t10;
    let t11;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 138,
            columnNumber: 11
        }, this);
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "hidden md:inline",
            children: "Récents"
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 139,
            columnNumber: 11
        }, this);
        $[14] = t10;
        $[15] = t11;
    } else {
        t10 = $[14];
        t11 = $[15];
    }
    let t12;
    if ($[16] !== t8 || $[17] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t8,
            className: t9,
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 148,
            columnNumber: 11
        }, this);
        $[16] = t8;
        $[17] = t9;
        $[18] = t12;
    } else {
        t12 = $[18];
    }
    let t13;
    if ($[19] !== filter) {
        t13 = ({
            "PostList[<button>.onClick]": ()=>{
                if (filter === "friends") {
                    setFilter("all");
                } else {
                    setFilter("friends");
                }
            }
        })["PostList[<button>.onClick]"];
        $[19] = filter;
        $[20] = t13;
    } else {
        t13 = $[20];
    }
    const t14 = `flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === "friends" ? "bg-alerts text-white" : "text-border"}`;
    let t15;
    let t16;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 175,
            columnNumber: 11
        }, this);
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "hidden md:inline",
            children: "Amis"
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 176,
            columnNumber: 11
        }, this);
        $[21] = t15;
        $[22] = t16;
    } else {
        t15 = $[21];
        t16 = $[22];
    }
    let t17;
    if ($[23] !== t13 || $[24] !== t14) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t13,
            className: t14,
            children: [
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 185,
            columnNumber: 11
        }, this);
        $[23] = t13;
        $[24] = t14;
        $[25] = t17;
    } else {
        t17 = $[25];
    }
    let t18;
    if ($[26] !== t12 || $[27] !== t17 || $[28] !== t7) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-5",
            children: [
                t7,
                t12,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 194,
            columnNumber: 11
        }, this);
        $[26] = t12;
        $[27] = t17;
        $[28] = t7;
        $[29] = t18;
    } else {
        t18 = $[29];
    }
    let t19;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex px-4 gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/app/components/home/PostList.tsx",
                    lineNumber: 204,
                    columnNumber: 44
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "hidden md:inline",
                    children: "Filtres"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/home/PostList.tsx",
                    lineNumber: 204,
                    columnNumber: 75
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 204,
            columnNumber: 11
        }, this);
        $[30] = t19;
    } else {
        t19 = $[30];
    }
    let t20;
    if ($[31] !== t18) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between border border-border bg-accent rounded-full py-1 px-6",
            children: [
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 211,
            columnNumber: 11
        }, this);
        $[31] = t18;
        $[32] = t20;
    } else {
        t20 = $[32];
    }
    let t21;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = posts ? posts.map(_PostListPostsMap) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "Aucun post trouvé"
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 219,
            columnNumber: 50
        }, this);
        $[33] = t21;
    } else {
        t21 = $[33];
    }
    let t22;
    if ($[34] !== t2 || $[35] !== t20) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5",
            children: [
                t2,
                t20,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/PostList.tsx",
            lineNumber: 226,
            columnNumber: 11
        }, this);
        $[34] = t2;
        $[35] = t20;
        $[36] = t22;
    } else {
        t22 = $[36];
    }
    return t22;
}
_s(PostList, "boPJerHaELAyf+PNkR+Y8+JetQg=");
_c = PostList;
function _PostListPostsMap(post) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$PostCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        post: post
    }, post.id, false, {
        fileName: "[project]/src/app/components/home/PostList.tsx",
        lineNumber: 236,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "PostList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/home/Chat.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Chat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smile.js [app-client] (ecmascript) <export default as Smile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SendHorizonal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send-horizontal.js [app-client] (ecmascript) <export default as SendHorizonal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-client] (ecmascript) <export default as CircleUser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$fr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/fr.js [app-client] (ecmascript)");
;
;
;
;
;
;
function Chat(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(23);
    if ($[0] !== "a8fa8f509c8bc87d1158dc4ac33a7f561f5be8e64442a21ce722c1b697cd1109") {
        for(let $i = 0; $i < 23; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a8fa8f509c8bc87d1158dc4ac33a7f561f5be8e64442a21ce722c1b697cd1109";
    }
    const { user } = t0;
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    if ($[1] !== user) {
        const chatMessages = [
            {
                id: 1,
                username: "John Doe",
                content: "Comming soon...",
                avatar_url: "/logo.png",
                created_at: "2026-03-10T12:00:00.000000Z"
            },
            {
                id: 2,
                username: "Jane Doe",
                content: "Comming soon...",
                created_at: "2026-03-10T13:00:00.000000Z"
            },
            {
                id: 3,
                username: user?.username,
                content: "Le chat arriveras dans une prochaine mise \xE0 jour",
                created_at: "2026-03-10T13:00:00.000000Z"
            },
            {
                id: 4,
                username: user?.username,
                content: "Le chat arriveras dans une prochaine mise \xE0 jour",
                created_at: "2026-03-10T13:00:00.000000Z"
            },
            {
                id: 5,
                username: user?.username,
                content: "Le chat arriveras dans une prochaine mise \xE0 jour",
                created_at: "2026-03-10T13:00:00.000000Z"
            },
            {
                id: 6,
                username: user?.username,
                content: "Le chat arriveras dans une prochaine mise \xE0 jour",
                created_at: "2026-03-10T13:00:00.000000Z"
            }
        ];
        t5 = "flex flex-col w-full bg-accent h-auto py-2 shadow-sm border border-border rounded-[15px]";
        t3 = "flex flex-col gap-2";
        if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-3 pr-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-primary text-4xl px-3",
                                children: "#"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/home/Chat.tsx",
                                lineNumber: 59,
                                columnNumber: 95
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl py-2",
                                children: "Général"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/home/Chat.tsx",
                                lineNumber: 59,
                                columnNumber: 148
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/home/Chat.tsx",
                        lineNumber: 59,
                        columnNumber: 73
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-primary",
                        children: "X en lignes"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/home/Chat.tsx",
                        lineNumber: 59,
                        columnNumber: 193
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/home/Chat.tsx",
                lineNumber: 59,
                columnNumber: 12
            }, this);
            $[7] = t4;
        } else {
            t4 = $[7];
        }
        t1 = "flex flex-col gap-2 max-h-[280px] h-[280px] px-2 pb-2 overflow-y-auto scrollbar-hide";
        t2 = chatMessages.map({
            "Chat[chatMessages.map()]": (message)=>{
                const isMe = user && message.username === user.username;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex gap-2 ${isMe ? "flex-row-reverse" : ""}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 shrink-0 rounded-full overflow-hidden bg-muted border-2 border-border flex items-center justify-center",
                            children: message.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: message.avatar_url,
                                alt: "Avatar",
                                width: 32,
                                height: 32,
                                className: "w-full h-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/home/Chat.tsx",
                                lineNumber: 68,
                                columnNumber: 247
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUser$3e$__["CircleUser"], {
                                size: 18,
                                strokeWidth: 1.5,
                                className: "text-base-content/70"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/home/Chat.tsx",
                                lineNumber: 68,
                                columnNumber: 359
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/home/Chat.tsx",
                            lineNumber: 68,
                            columnNumber: 97
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex flex-col gap-0.5 max-w-[85%] ${isMe ? "items-end" : "items-start"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `px-3 py-2 rounded-2xl ${isMe ? "bg-primary rounded-tr-md" : "bg-muted rounded-tl-md"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-medium opacity-90",
                                            children: isMe ? "Moi" : message.username
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/home/Chat.tsx",
                                            lineNumber: 68,
                                            columnNumber: 637
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: message.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/home/Chat.tsx",
                                            lineNumber: 68,
                                            columnNumber: 720
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/home/Chat.tsx",
                                    lineNumber: 68,
                                    columnNumber: 532
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-base-content/60 px-1",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(message.created_at), {
                                        addSuffix: true,
                                        locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$fr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fr"]
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/home/Chat.tsx",
                                    lineNumber: 68,
                                    columnNumber: 770
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/home/Chat.tsx",
                            lineNumber: 68,
                            columnNumber: 441
                        }, this)
                    ]
                }, message.id, true, {
                    fileName: "[project]/src/app/components/home/Chat.tsx",
                    lineNumber: 68,
                    columnNumber: 16
                }, this);
            }
        }["Chat[chatMessages.map()]"]);
        $[1] = user;
        $[2] = t1;
        $[3] = t2;
        $[4] = t3;
        $[5] = t4;
        $[6] = t5;
    } else {
        t1 = $[2];
        t2 = $[3];
        t3 = $[4];
        t4 = $[5];
        t5 = $[6];
    }
    let t6;
    if ($[8] !== t1 || $[9] !== t2) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Chat.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, this);
        $[8] = t1;
        $[9] = t2;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    let t8;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
            size: 20,
            className: "text-border shrink-0"
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Chat.tsx",
            lineNumber: 99,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            placeholder: "Envoyer un message",
            className: "input input-ghost w-full bg-transparent text-sm text-border focus:outline-none"
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Chat.tsx",
            lineNumber: 100,
            columnNumber: 10
        }, this);
        $[11] = t7;
        $[12] = t8;
    } else {
        t7 = $[11];
        t8 = $[12];
    }
    let t9;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 mx-2 mt-2 p-2 bg-muted rounded-full border border-border",
            children: [
                t7,
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "btn btn-circle btn-ghost btn-sm bg-primary shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SendHorizonal$3e$__["SendHorizonal"], {
                        size: 18,
                        className: "text-primary-content"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/home/Chat.tsx",
                        lineNumber: 109,
                        columnNumber: 202
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/components/home/Chat.tsx",
                    lineNumber: 109,
                    columnNumber: 116
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/Chat.tsx",
            lineNumber: 109,
            columnNumber: 10
        }, this);
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== t6) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t6,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/Chat.tsx",
            lineNumber: 116,
            columnNumber: 11
        }, this);
        $[14] = t6;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== t10 || $[17] !== t3 || $[18] !== t4) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: [
                t4,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/Chat.tsx",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        $[16] = t10;
        $[17] = t3;
        $[18] = t4;
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[20] !== t11 || $[21] !== t5) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t5,
            children: t11
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Chat.tsx",
            lineNumber: 134,
            columnNumber: 11
        }, this);
        $[20] = t11;
        $[21] = t5;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    return t12;
}
_c = Chat;
var _c;
__turbopack_context__.k.register(_c, "Chat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/home/Calendar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Calendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfMonth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/endOfMonth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfWeek.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/endOfWeek.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$eachDayOfInterval$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/eachDayOfInterval.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isSameMonth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isSameDay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addMonths.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subMonths.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$fr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/fr.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Calendar() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(65);
    if ($[0] !== "cfdd895e4727f5029774582560f17ac5300a9d3412502f5609d99c8bb13e1402") {
        for(let $i = 0; $i < 65; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "cfdd895e4727f5029774582560f17ac5300a9d3412502f5609d99c8bb13e1402";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = new Date();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [currentMonth, setCurrentMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const [selectedDay, setSelectedDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            {
                id: 1,
                title: "Tome 1 de Naruto",
                date: "2026-03-13",
                description: "Le premier tome de Naruto"
            },
            {
                id: 2,
                title: "Tome 2 de Naruto",
                date: "2026-03-20",
                description: "Le deuxi\xE8me tome de Naruto"
            },
            {
                id: 3,
                title: "Tome 3 de Naruto",
                date: "2026-03-27",
                description: "Le troisi\xE8me tome de Naruto"
            }
        ];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const events = t1;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    if ($[3] !== currentMonth) {
        const monthStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(currentMonth);
        const monthEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfMonth"])(monthStart);
        const startDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(monthStart, {
            weekStartsOn: 1
        });
        const endDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfWeek"])(monthEnd, {
            weekStartsOn: 1
        });
        const calendarDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$eachDayOfInterval$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eachDayOfInterval"])({
            start: startDate,
            end: endDate
        });
        const nextMonth = {
            "Calendar[nextMonth]": ()=>setCurrentMonth((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(currentMonth, 1))
        }["Calendar[nextMonth]"];
        const prevMonth = {
            "Calendar[prevMonth]": ()=>setCurrentMonth((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMonths"])(currentMonth, 1))
        }["Calendar[prevMonth]"];
        t7 = "card bg-accent rounded-[15px] shadow-xl border border-border w-full";
        t4 = "card-body p-4";
        let t8;
        if ($[10] !== prevMonth) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: prevMonth,
                className: "btn btn-ghost btn-sm btn-circle text-border hover:bg-primary hover:text-primary-content border-none",
                "aria-label": "Mois pr\xE9c\xE9dent",
                children: "‹"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 76,
                columnNumber: 12
            }, this);
            $[10] = prevMonth;
            $[11] = t8;
        } else {
            t8 = $[11];
        }
        const t9 = currentMonth.getMonth();
        const t10 = {
            "Calendar[<select>.onChange]": (e)=>setCurrentMonth(new Date(currentMonth.getFullYear(), Number(e.target.value), 1))
        }["Calendar[<select>.onChange]"];
        let t11;
        let t12;
        let t13;
        let t14;
        let t15;
        let t16;
        let t17;
        let t18;
        let t19;
        let t20;
        let t21;
        let t22;
        if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 0,
                children: "Janvier"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 99,
                columnNumber: 13
            }, this);
            t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 1,
                children: "Février"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 100,
                columnNumber: 13
            }, this);
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 2,
                children: "Mars"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 101,
                columnNumber: 13
            }, this);
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 3,
                children: "Avril"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 102,
                columnNumber: 13
            }, this);
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 4,
                children: "Mai"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 103,
                columnNumber: 13
            }, this);
            t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 5,
                children: "Juin"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 104,
                columnNumber: 13
            }, this);
            t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 6,
                children: "Juillet"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 105,
                columnNumber: 13
            }, this);
            t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 7,
                children: "Août"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 106,
                columnNumber: 13
            }, this);
            t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 8,
                children: "Septembre"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this);
            t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 9,
                children: "Octobre"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 108,
                columnNumber: 13
            }, this);
            t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 10,
                children: "Novembre"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 109,
                columnNumber: 13
            }, this);
            t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: 11,
                children: "Décembre"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 110,
                columnNumber: 13
            }, this);
            $[12] = t11;
            $[13] = t12;
            $[14] = t13;
            $[15] = t14;
            $[16] = t15;
            $[17] = t16;
            $[18] = t17;
            $[19] = t18;
            $[20] = t19;
            $[21] = t20;
            $[22] = t21;
            $[23] = t22;
        } else {
            t11 = $[12];
            t12 = $[13];
            t13 = $[14];
            t14 = $[15];
            t15 = $[16];
            t16 = $[17];
            t17 = $[18];
            t18 = $[19];
            t19 = $[20];
            t20 = $[21];
            t21 = $[22];
            t22 = $[23];
        }
        let t23;
        if ($[24] !== t10 || $[25] !== t9) {
            t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                className: "select select-bordered bg-transparent border-border border select-sm flex-1 max-w-[120px]",
                value: t9,
                onChange: t10,
                children: [
                    t11,
                    t12,
                    t13,
                    t14,
                    t15,
                    t16,
                    t17,
                    t18,
                    t19,
                    t20,
                    t21,
                    t22
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 139,
                columnNumber: 13
            }, this);
            $[24] = t10;
            $[25] = t9;
            $[26] = t23;
        } else {
            t23 = $[26];
        }
        const t24 = currentMonth.getFullYear();
        const t25 = {
            "Calendar[<select>.onChange]": (e_0)=>setCurrentMonth(new Date(Number(e_0.target.value), currentMonth.getMonth(), 1))
        }["Calendar[<select>.onChange]"];
        const t26 = Array.from({
            length: 11
        }, {
            "Calendar[Array.from()]": (_, i)=>currentMonth.getFullYear() - 5 + i
        }["Calendar[Array.from()]"]);
        let t27;
        if ($[27] !== t26) {
            t27 = t26.map(_CalendarAnonymous);
            $[27] = t26;
            $[28] = t27;
        } else {
            t27 = $[28];
        }
        let t28;
        if ($[29] !== t24 || $[30] !== t25 || $[31] !== t27) {
            t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                className: "select select-bordered bg-transparent border-border border select-sm flex-1 max-w-[100px]",
                value: t24,
                onChange: t25,
                children: t27
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 165,
                columnNumber: 13
            }, this);
            $[29] = t24;
            $[30] = t25;
            $[31] = t27;
            $[32] = t28;
        } else {
            t28 = $[32];
        }
        let t29;
        if ($[33] !== nextMonth) {
            t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: nextMonth,
                className: "btn btn-ghost btn-sm btn-circle text-border hover:bg-primary hover:text-primary-content border-none",
                "aria-label": "Mois suivant",
                children: "›"
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 175,
                columnNumber: 13
            }, this);
            $[33] = nextMonth;
            $[34] = t29;
        } else {
            t29 = $[34];
        }
        if ($[35] !== t23 || $[36] !== t28 || $[37] !== t29 || $[38] !== t8) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center gap-2 mb-4",
                children: [
                    t8,
                    t23,
                    t28,
                    t29
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 182,
                columnNumber: 12
            }, this);
            $[35] = t23;
            $[36] = t28;
            $[37] = t29;
            $[38] = t8;
            $[39] = t5;
        } else {
            t5 = $[39];
        }
        if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 gap-1 text-center text-xs font-semibold opacity-50 mb-2",
                children: [
                    "L",
                    "M",
                    "M",
                    "J",
                    "V",
                    "S",
                    "D"
                ].map(_CalendarAnonymous2)
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 192,
                columnNumber: 12
            }, this);
            $[40] = t6;
        } else {
            t6 = $[40];
        }
        t2 = "grid grid-cols-7 gap-1";
        t3 = calendarDays.map({
            "Calendar[calendarDays.map()]": (day, idx)=>{
                const dateStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(day, "yyyy-MM-dd");
                const hasEvent = events.some({
                    "Calendar[calendarDays.map() > events.some()]": (e_1)=>e_1.date === dateStr
                }["Calendar[calendarDays.map() > events.some()]"]);
                const isCurrentMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameMonth"])(day, monthStart);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "Calendar[calendarDays.map() > <button>.onClick]": ()=>{
                            setSelectedDay(day);
                            document.getElementById("calendar_modal").showModal();
                        }
                    }["Calendar[calendarDays.map() > <button>.onClick]"],
                    className: `
                  flex flex-col items-center justify-center p-2 rounded-lg text-xs transition-colors
                  ${!isCurrentMonth ? "opacity-20" : "hover:bg-primary hover:text-primary-content"}
                  ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(day, new Date()) ? "bg-primary text-primary-content" : ""}
                `,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(day, "d"),
                        hasEvent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-1 h-1 bg-error rounded-full mt-1"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/home/Calendar.tsx",
                            lineNumber: 214,
                            columnNumber: 51
                        }, this)
                    ]
                }, idx, true, {
                    fileName: "[project]/src/app/components/home/Calendar.tsx",
                    lineNumber: 205,
                    columnNumber: 16
                }, this);
            }
        }["Calendar[calendarDays.map()]"]);
        $[3] = currentMonth;
        $[4] = t2;
        $[5] = t3;
        $[6] = t4;
        $[7] = t5;
        $[8] = t6;
        $[9] = t7;
    } else {
        t2 = $[4];
        t3 = $[5];
        t4 = $[6];
        t5 = $[7];
        t6 = $[8];
        t7 = $[9];
    }
    let t8;
    if ($[41] !== t2 || $[42] !== t3) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Calendar.tsx",
            lineNumber: 234,
            columnNumber: 10
        }, this);
        $[41] = t2;
        $[42] = t3;
        $[43] = t8;
    } else {
        t8 = $[43];
    }
    let t9;
    if ($[44] !== t4 || $[45] !== t5 || $[46] !== t6 || $[47] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            children: [
                t5,
                t6,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/Calendar.tsx",
            lineNumber: 243,
            columnNumber: 10
        }, this);
        $[44] = t4;
        $[45] = t5;
        $[46] = t6;
        $[47] = t8;
        $[48] = t9;
    } else {
        t9 = $[48];
    }
    let t10;
    if ($[49] !== selectedDay) {
        t10 = selectedDay ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(selectedDay, "eeee d MMMM", {
            locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$fr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fr"]
        }) : "";
        $[49] = selectedDay;
        $[50] = t10;
    } else {
        t10 = $[50];
    }
    let t11;
    if ($[51] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-bold text-lg",
            children: t10
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Calendar.tsx",
            lineNumber: 264,
            columnNumber: 11
        }, this);
        $[51] = t10;
        $[52] = t11;
    } else {
        t11 = $[52];
    }
    let t12;
    if ($[53] !== selectedDay) {
        t12 = selectedDay && events.filter({
            "Calendar[events.filter()]": (e_4)=>e_4.date === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(selectedDay, "yyyy-MM-dd")
        }["Calendar[events.filter()]"]).length > 0 ? events.filter({
            "Calendar[events.filter()]": (e_2)=>e_2.date === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(selectedDay, "yyyy-MM-dd")
        }["Calendar[events.filter()]"]).map(_CalendarAnonymous3) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm opacity-60",
            children: "Aucun événement prévu."
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Calendar.tsx",
            lineNumber: 276,
            columnNumber: 64
        }, this);
        $[53] = selectedDay;
        $[54] = t12;
    } else {
        t12 = $[54];
    }
    let t13;
    if ($[55] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-4",
            children: t12
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Calendar.tsx",
            lineNumber: 284,
            columnNumber: 11
        }, this);
        $[55] = t12;
        $[56] = t13;
    } else {
        t13 = $[56];
    }
    let t14;
    if ($[57] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-action",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                method: "dialog",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "btn",
                    children: "Fermer"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/home/Calendar.tsx",
                    lineNumber: 292,
                    columnNumber: 63
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 292,
                columnNumber: 41
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Calendar.tsx",
            lineNumber: 292,
            columnNumber: 11
        }, this);
        $[57] = t14;
    } else {
        t14 = $[57];
    }
    let t15;
    if ($[58] !== t11 || $[59] !== t13) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dialog", {
            id: "calendar_modal",
            className: "modal modal-bottom sm:modal-middle",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-box",
                children: [
                    t11,
                    t13,
                    t14
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/home/Calendar.tsx",
                lineNumber: 299,
                columnNumber: 86
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/home/Calendar.tsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[58] = t11;
        $[59] = t13;
        $[60] = t15;
    } else {
        t15 = $[60];
    }
    let t16;
    if ($[61] !== t15 || $[62] !== t7 || $[63] !== t9) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t7,
            children: [
                t9,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/Calendar.tsx",
            lineNumber: 308,
            columnNumber: 11
        }, this);
        $[61] = t15;
        $[62] = t7;
        $[63] = t9;
        $[64] = t16;
    } else {
        t16 = $[64];
    }
    return t16;
}
_s(Calendar, "FSeLN1/hsqm59iSrwTueKnq0p34=");
_c = Calendar;
function _CalendarAnonymous3(e_3) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "alert alert-info shadow-sm mb-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "font-bold",
                    children: e_3.title
                }, void 0, false, {
                    fileName: "[project]/src/app/components/home/Calendar.tsx",
                    lineNumber: 319,
                    columnNumber: 77
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm",
                    children: e_3.description
                }, void 0, false, {
                    fileName: "[project]/src/app/components/home/Calendar.tsx",
                    lineNumber: 319,
                    columnNumber: 119
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/home/Calendar.tsx",
            lineNumber: 319,
            columnNumber: 72
        }, this)
    }, e_3.id, false, {
        fileName: "[project]/src/app/components/home/Calendar.tsx",
        lineNumber: 319,
        columnNumber: 10
    }, this);
}
function _CalendarAnonymous2(d) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: d
    }, d, false, {
        fileName: "[project]/src/app/components/home/Calendar.tsx",
        lineNumber: 322,
        columnNumber: 10
    }, this);
}
function _CalendarAnonymous(y) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: y,
        children: y
    }, y, false, {
        fileName: "[project]/src/app/components/home/Calendar.tsx",
        lineNumber: 325,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "Calendar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$home$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/home/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$home$2f$PostList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/home/PostList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$home$2f$Chat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/home/Chat.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$home$2f$Calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/home/Calendar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function HomePage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(36);
    if ($[0] !== "011c3b1ed441bf7e5dfea2aabc77dd42915eb1bfd34a95e7c2a01b6b344b76b7") {
        for(let $i = 0; $i < 36; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "011c3b1ed441bf7e5dfea2aabc77dd42915eb1bfd34a95e7c2a01b6b344b76b7";
    }
    const { isLoggedIn, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    let t0;
    if ($[1] !== isLoggedIn || $[2] !== user) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "hidden md:flex flex-col w-full h-full gap-5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$home$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isLoggedIn: isLoggedIn,
                user: user
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 27,
                columnNumber: 75
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 27,
            columnNumber: 10
        }, this);
        $[1] = isLoggedIn;
        $[2] = user;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    let t1;
    if ($[4] !== isLoggedIn || $[5] !== user) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "flex flex-col md:col-span-3 w-full h-full min-h-0 md:px-6 gap-3 overflow-y-auto scrollbar-hide",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$home$2f$PostList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isLoggedIn: isLoggedIn,
                user: user
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 36,
                columnNumber: 126
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 36,
            columnNumber: 10
        }, this);
        $[4] = isLoggedIn;
        $[5] = user;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    let t2;
    if ($[7] !== user) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$home$2f$Chat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            user: user
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[7] = user;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$home$2f$Calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    let t4;
    if ($[10] !== t2) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "hidden md:flex flex-col w-full mx-auto h-full gap-5",
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 60,
            columnNumber: 10
        }, this);
        $[10] = t2;
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    let t5;
    if ($[12] !== t0 || $[13] !== t1 || $[14] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "md:grid md:grid-cols-5 md:place-items-center md:h-screen px-4 md:px-15 py-5 md:py-10 max-w-[1500px] mx-auto pb-20 md:pb-10",
            children: [
                t0,
                t1,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        $[12] = t0;
        $[13] = t1;
        $[14] = t4;
        $[15] = t5;
    } else {
        t5 = $[15];
    }
    const t6 = `flex flex-col items-center gap-1 text-xs ${pathname === "/" ? "text-primary" : "text-border"}`;
    let t7;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    let t8;
    if ($[17] !== t6) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: t6,
            children: [
                t7,
                "Accueil"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 86,
            columnNumber: 10
        }, this);
        $[17] = t6;
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    const t9 = `flex flex-col items-center gap-1 text-xs ${pathname === "/list" ? "text-primary" : "text-border"}`;
    let t10;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 95,
            columnNumber: 11
        }, this);
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    let t11;
    if ($[20] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/list",
            className: t9,
            children: [
                t10,
                "Bibliothèque"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 102,
            columnNumber: 11
        }, this);
        $[20] = t9;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    const t12 = `flex flex-col items-center gap-1 text-xs ${pathname === "/forum" ? "text-primary" : "text-border"}`;
    let t13;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 111,
            columnNumber: 11
        }, this);
        $[22] = t13;
    } else {
        t13 = $[22];
    }
    let t14;
    if ($[23] !== t12) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/forum",
            className: t12,
            children: [
                t13,
                "Forum"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 118,
            columnNumber: 11
        }, this);
        $[23] = t12;
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    const t15 = `flex flex-col items-center gap-1 text-xs ${pathname === "/chat" ? "text-primary" : "text-border"}`;
    let t16;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 127,
            columnNumber: 11
        }, this);
        $[25] = t16;
    } else {
        t16 = $[25];
    }
    let t17;
    if ($[26] !== t15) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/chat",
            className: t15,
            children: [
                t16,
                "Chat"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 134,
            columnNumber: 11
        }, this);
        $[26] = t15;
        $[27] = t17;
    } else {
        t17 = $[27];
    }
    let t18;
    if ($[28] !== t11 || $[29] !== t14 || $[30] !== t17 || $[31] !== t8) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "md:hidden fixed bottom-0 left-0 right-0 bg-accent border-t border-border flex justify-around items-center h-16 z-50",
            children: [
                t8,
                t11,
                t14,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 142,
            columnNumber: 11
        }, this);
        $[28] = t11;
        $[29] = t14;
        $[30] = t17;
        $[31] = t8;
        $[32] = t18;
    } else {
        t18 = $[32];
    }
    let t19;
    if ($[33] !== t18 || $[34] !== t5) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t5,
                t18
            ]
        }, void 0, true);
        $[33] = t18;
        $[34] = t5;
        $[35] = t19;
    } else {
        t19 = $[35];
    }
    return t19;
}
_s(HomePage, "VrWoO9qJOIXyD0/5Enb9K8RsaJk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_7d29ad8f._.js.map