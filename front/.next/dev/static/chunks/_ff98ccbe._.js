(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(auth)/register/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/axios.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function RegisterPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(23);
    if ($[0] !== "223f6234abdd280fe3f18f7b0f49e80e16a8a29cb8650cc26d32b3f03098324f") {
        for(let $i = 0; $i < 23; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "223f6234abdd280fe3f18f7b0f49e80e16a8a29cb8650cc26d32b3f03098324f";
    }
    const { login } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [birthdate, setBirthdate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t0;
    if ($[1] !== birthdate || $[2] !== email || $[3] !== login || $[4] !== password || $[5] !== router || $[6] !== username) {
        t0 = ({
            "RegisterPage[handleSubmit]": async (e)=>{
                e.preventDefault();
                ;
                try {
                    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/auth/register", {
                        username,
                        email,
                        password,
                        birthdate
                    });
                    login(response.data.token, response.data.user);
                    router.push("/");
                } catch (t1) {
                    const err = t1;
                    setError(err.response?.data?.message || "Erreur lors de l'inscription");
                }
            }
        })["RegisterPage[handleSubmit]"];
        $[1] = birthdate;
        $[2] = email;
        $[3] = login;
        $[4] = password;
        $[5] = router;
        $[6] = username;
        $[7] = t0;
    } else {
        t0 = $[7];
    }
    const handleSubmit = t0;
    let t1;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "card-title text-2xl font-bold",
            children: "Créer un compte"
        }, void 0, false, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 59,
            columnNumber: 10
        }, this);
        $[8] = t1;
    } else {
        t1 = $[8];
    }
    let t2;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "label",
            children: "Nom d'utilisateur"
        }, void 0, false, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        $[9] = t2;
    } else {
        t2 = $[9];
    }
    let t3;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "form-control",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Pseudo",
                    className: "input input-bordered",
                    required: true,
                    onChange: {
                        "RegisterPage[<input>.onChange]": (e_0)=>setUsername(e_0.target.value)
                    }["RegisterPage[<input>.onChange]"]
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/register/page.tsx",
                    lineNumber: 73,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 73,
            columnNumber: 10
        }, this);
        $[10] = t3;
    } else {
        t3 = $[10];
    }
    let t4;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "label",
            children: "Email"
        }, void 0, false, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    let t5;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "form-control",
            children: [
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "email",
                    placeholder: "email@exemple.com",
                    className: "input input-bordered",
                    required: true,
                    onChange: {
                        "RegisterPage[<input>.onChange]": (e_1)=>setEmail(e_1.target.value)
                    }["RegisterPage[<input>.onChange]"]
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/register/page.tsx",
                    lineNumber: 89,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, this);
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    let t6;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "label",
            children: "Date de naissance"
        }, void 0, false, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 98,
            columnNumber: 10
        }, this);
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    let t7;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "form-control",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "date",
                    className: "input input-bordered",
                    required: true,
                    onChange: {
                        "RegisterPage[<input>.onChange]": (e_2)=>setBirthdate(e_2.target.value)
                    }["RegisterPage[<input>.onChange]"]
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/register/page.tsx",
                    lineNumber: 105,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 105,
            columnNumber: 10
        }, this);
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "label",
            children: "Mot de passe"
        }, void 0, false, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 114,
            columnNumber: 10
        }, this);
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "form-control",
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "password",
                    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                    className: "input input-bordered",
                    required: true,
                    onChange: {
                        "RegisterPage[<input>.onChange]": (e_3)=>setPassword(e_3.target.value)
                    }["RegisterPage[<input>.onChange]"]
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/register/page.tsx",
                    lineNumber: 121,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 121,
            columnNumber: 10
        }, this);
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "form-control mt-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: "btn btn-primary",
                children: "S'inscrire"
            }, void 0, false, {
                fileName: "[project]/src/app/(auth)/register/page.tsx",
                lineNumber: 130,
                columnNumber: 46
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 130,
            columnNumber: 11
        }, this);
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    let t11;
    if ($[18] !== error) {
        t11 = error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-red-500",
            children: error
        }, void 0, false, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 137,
            columnNumber: 20
        }, this);
        $[18] = error;
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[20] !== handleSubmit || $[21] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen items-center justify-center bg-base-200",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card w-full max-w-md bg-base-100 shadow-xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: "card-body",
                    onSubmit: handleSubmit,
                    children: [
                        t1,
                        t3,
                        t5,
                        t7,
                        t9,
                        t10,
                        t11
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/register/page.tsx",
                    lineNumber: 145,
                    columnNumber: 146
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(auth)/register/page.tsx",
                lineNumber: 145,
                columnNumber: 86
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 145,
            columnNumber: 11
        }, this);
        $[20] = handleSubmit;
        $[21] = t11;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    return t12;
}
_s(RegisterPage, "k99AMitKeSKpyFANU28IZfzOUSY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RegisterPage;
var _c;
__turbopack_context__.k.register(_c, "RegisterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_ff98ccbe._.js.map