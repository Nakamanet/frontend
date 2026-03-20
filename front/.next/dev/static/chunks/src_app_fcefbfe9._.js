(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/profile/components/form/PersonnalForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PersonnalForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function PersonnalForm({ user }) {
    _s();
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user.username);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user.email);
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password_confirmation, setPassword_confirmation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fieldErrors, setFieldErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const { refreshUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleSubmitPersonal = async (e)=>{
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setFieldErrors({});
        setIsSubmitting(true);
        try {
            const payload = {
                username,
                email,
                password: password ?? '',
                password_confirmation: password_confirmation ?? ''
            };
            if (password && password_confirmation && password !== password_confirmation) {
                setFieldErrors({
                    password: "Les mots de passe ne correspondent pas"
                });
                setErrorMessage("Les mots de passe ne correspondent pas");
                setIsSubmitting(false);
                return;
            }
            if (password && !password_confirmation || !password && password_confirmation) {
                setFieldErrors({
                    password: "Les deux champs doivent être remplis"
                });
                setErrorMessage("Les deux champs doivent être remplis");
                setIsSubmitting(false);
                return;
            }
            const body = Object.fromEntries(Object.entries(payload).filter(([, v])=>v !== undefined && v !== null && v !== ''));
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch('/auth/profile', body);
            setSuccessMessage(data.message);
            await refreshUser();
        } catch (err) {
            const res = err.response?.data;
            if (err.response?.status === 422 && res?.errors) {
                const errors = {};
                Object.entries(res.errors).forEach(([key, messages])=>{
                    errors[key] = Array.isArray(messages) ? messages[0] : String(messages);
                });
                setFieldErrors(errors);
                setErrorMessage(res?.message ?? "Erreur de validation");
            } else {
                setErrorMessage(res?.message ?? "Erreur lors de la mise à jour du profil");
            }
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-bold",
                children: "Informations personnelles"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "grid grid-cols-2 gap-4",
                onSubmit: handleSubmitPersonal,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "username",
                                        children: "Nom d'utilisateur"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                        lineNumber: 82,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "username",
                                        name: "username",
                                        className: "input input-ghost bg-border rounded-full",
                                        value: username,
                                        onChange: (e_0)=>setUsername(e_0.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                        lineNumber: 83,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                lineNumber: 81,
                                columnNumber: 21
                            }, this),
                            fieldErrors.username && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.username
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                lineNumber: 85,
                                columnNumber: 46
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "email",
                                        children: "Email"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                        lineNumber: 88,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        id: "email",
                                        name: "email",
                                        className: "input input-ghost bg-border rounded-full",
                                        value: email,
                                        onChange: (e_1)=>setEmail(e_1.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                        lineNumber: 89,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                lineNumber: 87,
                                columnNumber: 21
                            }, this),
                            fieldErrors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.email
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                lineNumber: 91,
                                columnNumber: 43
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                        lineNumber: 80,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "password",
                                        children: "Mot de passe"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                        lineNumber: 95,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        id: "password",
                                        name: "password",
                                        className: "input input-ghost bg-border rounded-full",
                                        value: password,
                                        onChange: (e_2)=>setPassword(e_2.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                        lineNumber: 96,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                lineNumber: 94,
                                columnNumber: 21
                            }, this),
                            fieldErrors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.password
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                lineNumber: 98,
                                columnNumber: 46
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "password_confirmation",
                                        children: "Confirmation mot de passe"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                        lineNumber: 101,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        id: "password_confirmation",
                                        name: "password_confirmation",
                                        className: "input input-ghost bg-border rounded-full",
                                        value: password_confirmation,
                                        onChange: (e_3)=>setPassword_confirmation(e_3.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                        lineNumber: 102,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                lineNumber: 100,
                                columnNumber: 21
                            }, this),
                            fieldErrors.password_confirmation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.password_confirmation
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                                lineNumber: 104,
                                columnNumber: 59
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                        lineNumber: 93,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "grid col-span-2 btn btn-ghost border-none bg-primary text-primary-content",
                        disabled: isSubmitting,
                        children: isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                        lineNumber: 107,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this),
            successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-success",
                children: successMessage
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                lineNumber: 111,
                columnNumber: 32
            }, this),
            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-alerts",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
                lineNumber: 112,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/profile/components/form/PersonnalForm.tsx",
        lineNumber: 77,
        columnNumber: 10
    }, this);
}
_s(PersonnalForm, "MjYhElFtzKramflP46k8QvupKbg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = PersonnalForm;
var _c;
__turbopack_context__.k.register(_c, "PersonnalForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/profile/components/form/SupplementaireForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SupplementaireForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/axios.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function SupplementaireForm({ user }) {
    _s();
    const [birthdate, setBirthdate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user.birthdate);
    const [localisation, setLocalisation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user.localisation);
    const [bio, setBio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user.bio);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fieldErrors, setFieldErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const { refreshUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleSubmitSupplementaire = async (e)=>{
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setFieldErrors({});
        setIsSubmitting(true);
        try {
            const payload = {
                birthdate: birthdate ?? '',
                localisation: localisation ?? '',
                bio: bio ?? ''
            };
            const body = Object.fromEntries(Object.entries(payload).filter(([, v])=>v !== undefined && v !== null && v !== ''));
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch('/auth/profile', body);
            setSuccessMessage(data.message);
            await refreshUser();
        } catch (err) {
            const res = err.response?.data;
            if (err.response?.status === 422 && res?.errors) {
                const errors = {};
                Object.entries(res.errors).forEach(([key, messages])=>{
                    errors[key] = Array.isArray(messages) ? messages[0] : String(messages);
                });
                setFieldErrors(errors);
                setErrorMessage(res?.message ?? "Erreur de validation");
            } else {
                setErrorMessage(res?.message ?? "Erreur lors de la mise à jour du profil");
            }
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-bold",
                children: "Informations supplémentaires"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "grid grid-cols-2 gap-4",
                onSubmit: handleSubmitSupplementaire,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "birthdate",
                                        children: "Date de naissance"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                        lineNumber: 64,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        id: "birthdate",
                                        name: "birthdate",
                                        className: "input input-ghost bg-border rounded-full",
                                        value: birthdate,
                                        onChange: (e_0)=>setBirthdate(e_0.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                        lineNumber: 65,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                lineNumber: 63,
                                columnNumber: 21
                            }, this),
                            fieldErrors.birthdate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.birthdate
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                lineNumber: 67,
                                columnNumber: 47
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid row-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "bio",
                                        children: "Bio"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                        lineNumber: 71,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "bio",
                                        name: "bio",
                                        className: "textarea textarea-ghost bg-border rounded-[15px] min-h-[120px]",
                                        value: bio || '',
                                        onChange: (e_1)=>setBio(e_1.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                        lineNumber: 72,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                lineNumber: 70,
                                columnNumber: 21
                            }, this),
                            fieldErrors.bio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.bio
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                lineNumber: 74,
                                columnNumber: 41
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "localisation",
                                        children: "Localisation"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                        lineNumber: 78,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "localisation",
                                        name: "localisation",
                                        className: "input input-ghost bg-border rounded-full",
                                        value: localisation || '',
                                        onChange: (e_2)=>setLocalisation(e_2.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                        lineNumber: 79,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                lineNumber: 77,
                                columnNumber: 21
                            }, this),
                            fieldErrors.localisation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.localisation
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                                lineNumber: 81,
                                columnNumber: 50
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                        lineNumber: 76,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "grid col-span-2 btn btn-ghost border-none bg-primary text-primary-content",
                        disabled: isSubmitting,
                        children: isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                        lineNumber: 84,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-success",
                children: successMessage
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                lineNumber: 88,
                columnNumber: 32
            }, this),
            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-alerts",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
                lineNumber: 89,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/profile/components/form/SupplementaireForm.tsx",
        lineNumber: 59,
        columnNumber: 10
    }, this);
}
_s(SupplementaireForm, "FGgk3UBr8TNot8sbCws+SJ3Lvcs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = SupplementaireForm;
var _c;
__turbopack_context__.k.register(_c, "SupplementaireForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/profile/components/form/MediaForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MediaForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/axios.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function MediaForm({ user }) {
    _s();
    const [avatar_url, setAvatar_url] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user.avatar_url);
    const [banner_url, setBanner_url] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user.banner_url);
    const [theme_preference, setTheme_preference] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user.theme_preference ?? "system");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fieldErrors, setFieldErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const { refreshUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleSubmitMedias = async (e)=>{
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setFieldErrors({});
        setIsSubmitting(true);
        try {
            const payload = {
                avatar_url: avatar_url ?? '',
                banner_url: banner_url ?? '',
                theme_preference: theme_preference ?? "system"
            };
            const body = Object.fromEntries(Object.entries(payload).filter(([, v])=>v !== undefined && v !== null && v !== ''));
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch('/auth/profile', body);
            setSuccessMessage(data.message);
            await refreshUser();
        } catch (err) {
            const res = err.response?.data;
            if (err.response?.status === 422 && res?.errors) {
                const errors = {};
                Object.entries(res.errors).forEach(([key, messages])=>{
                    errors[key] = Array.isArray(messages) ? messages[0] : String(messages);
                });
                setFieldErrors(errors);
                setErrorMessage(res?.message ?? "Erreur de validation");
            } else {
                setErrorMessage(res?.message ?? "Erreur lors de la mise à jour du profil");
            }
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-bold",
                children: "Médias"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "grid grid-cols-2 gap-4",
                onSubmit: handleSubmitMedias,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "avatar_url",
                                        children: "URL de l'avatar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                        lineNumber: 64,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "avatar_url",
                                        name: "avatar_url",
                                        className: "input input-ghost bg-border rounded-full",
                                        value: avatar_url ?? '',
                                        onChange: (e_0)=>setAvatar_url(e_0.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                        lineNumber: 65,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                lineNumber: 63,
                                columnNumber: 21
                            }, this),
                            fieldErrors.avatar_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.avatar_url
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                lineNumber: 67,
                                columnNumber: 48
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "banner_url",
                                        children: "URL de la bannière"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                        lineNumber: 71,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "banner_url",
                                        name: "banner_url",
                                        className: "input input-ghost bg-border rounded-full",
                                        value: banner_url ?? '',
                                        onChange: (e_1)=>setBanner_url(e_1.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                        lineNumber: 72,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                lineNumber: 70,
                                columnNumber: 21
                            }, this),
                            fieldErrors.banner_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.banner_url
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                lineNumber: 74,
                                columnNumber: 48
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "theme_preference",
                                        children: "Préférence de thème"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                        lineNumber: 78,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "theme_preference",
                                        name: "theme_preference",
                                        className: "input input-ghost bg-border rounded-full",
                                        value: theme_preference || '',
                                        onChange: (e_2)=>setTheme_preference(e_2.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "light",
                                                children: "Light"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                                lineNumber: 80,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "dark",
                                                children: "Dark"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                                lineNumber: 81,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "system",
                                                children: "System"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                                lineNumber: 82,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                        lineNumber: 79,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                lineNumber: 77,
                                columnNumber: 21
                            }, this),
                            fieldErrors.theme_preference && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.theme_preference
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                                lineNumber: 85,
                                columnNumber: 54
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                        lineNumber: 76,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "grid col-span-2 btn btn-ghost border-none bg-primary text-primary-content",
                        disabled: isSubmitting,
                        children: isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                        lineNumber: 87,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-success",
                children: successMessage
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                lineNumber: 91,
                columnNumber: 32
            }, this),
            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-alerts",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
                lineNumber: 92,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/profile/components/form/MediaForm.tsx",
        lineNumber: 59,
        columnNumber: 10
    }, this);
}
_s(MediaForm, "RZO0EN4z7hxKPIrSbpXX/l02b7Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = MediaForm;
var _c;
__turbopack_context__.k.register(_c, "MediaForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/profile/components/form/NotificationForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotificationForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/axios.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function NotificationForm({ user }) {
    _s();
    // A modifier plus tard quand ce sera en db
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [friendsRequests, setFriendsRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mentions, setMentions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [newSorties, setNewSorties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fieldErrors, setFieldErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const { refreshUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleSubmitMedias = async (e)=>{
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setFieldErrors({});
        setIsSubmitting(true);
        try {
            const payload = {
                comment: comment ?? '',
                friendsRequests: friendsRequests ?? '',
                mentions: mentions ?? '',
                newSorties: newSorties ?? ''
            };
            const body = Object.fromEntries(Object.entries(payload).filter(([, v])=>v !== undefined && v !== null && v !== ''));
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch('/auth/profile', body);
            setSuccessMessage(data.message);
            await refreshUser();
        } catch (err) {
            const res = err.response?.data;
            if (err.response?.status === 422 && res?.errors) {
                const errors = {};
                Object.entries(res.errors).forEach(([key, messages])=>{
                    errors[key] = Array.isArray(messages) ? messages[0] : String(messages);
                });
                setFieldErrors(errors);
                setErrorMessage(res?.message ?? "Erreur de validation");
            } else {
                setErrorMessage(res?.message ?? "Erreur lors de la mise à jour du profil");
            }
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-bold",
                children: "Notifications"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "grid grid-cols-2 gap-4",
                onSubmit: handleSubmitMedias,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Commentaires"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 68,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-border",
                                                children: "Quelqu'un commente un de tes posts"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 69,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                        lineNumber: 67,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `toggle text-base-content rounded-full ${comment ? 'bg-primary' : 'bg-border'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: comment,
                                                onChange: ()=>setComment(!comment)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 73,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "aria-label": "disabled",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "4",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M18 6 6 18"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "m6 6 12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 74,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "aria-label": "enabled",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                    strokeLinejoin: "round",
                                                    strokeLinecap: "round",
                                                    strokeWidth: "4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M20 6 9 17l-5-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 78,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                        lineNumber: 72,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                lineNumber: 66,
                                columnNumber: 21
                            }, this),
                            fieldErrors.comment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.comment
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                lineNumber: 85,
                                columnNumber: 45
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Demande d'ami"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 91,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-border",
                                                children: "Quelqu'un vous envoie une demande d'ami"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 92,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                        lineNumber: 90,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `toggle text-base-content rounded-full ${friendsRequests ? 'bg-primary' : 'bg-border'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: friendsRequests,
                                                onChange: ()=>setFriendsRequests(!friendsRequests)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 96,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "aria-label": "disabled",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "4",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M18 6 6 18"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "m6 6 12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 97,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "aria-label": "enabled",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                    strokeLinejoin: "round",
                                                    strokeLinecap: "round",
                                                    strokeWidth: "4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M20 6 9 17l-5-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 103,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 101,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                        lineNumber: 95,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                lineNumber: 89,
                                columnNumber: 21
                            }, this),
                            fieldErrors.friendsRequests && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.friendsRequests
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                lineNumber: 108,
                                columnNumber: 53
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                        lineNumber: 88,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Mentions"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 114,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-border",
                                                children: "Quand vous etes mentionné"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 115,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                        lineNumber: 113,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `toggle text-base-content rounded-full ${mentions ? 'bg-primary' : 'bg-border'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: mentions,
                                                onChange: ()=>setMentions(!mentions)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 119,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "aria-label": "disabled",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "4",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M18 6 6 18"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "m6 6 12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 120,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "aria-label": "enabled",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                    strokeLinejoin: "round",
                                                    strokeLinecap: "round",
                                                    strokeWidth: "4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M20 6 9 17l-5-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 124,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                        lineNumber: 118,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                lineNumber: 112,
                                columnNumber: 21
                            }, this),
                            fieldErrors.mentions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.mentions
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                lineNumber: 131,
                                columnNumber: 46
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                        lineNumber: 111,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Nouvelles sorties"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 137,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-border",
                                                children: "Nouveau chapitre/tome de vos oeuvres suivies"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 138,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                        lineNumber: 136,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `toggle text-base-content rounded-full ${newSorties ? 'bg-primary' : 'bg-border'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: newSorties,
                                                onChange: ()=>setNewSorties(!newSorties)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 142,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "aria-label": "disabled",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "4",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M18 6 6 18"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "m6 6 12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 143,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "aria-label": "enabled",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                    strokeLinejoin: "round",
                                                    strokeLinecap: "round",
                                                    strokeWidth: "4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M20 6 9 17l-5-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                                lineNumber: 147,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                        lineNumber: 141,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                lineNumber: 135,
                                columnNumber: 21
                            }, this),
                            fieldErrors.newSorties && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.newSorties
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                                lineNumber: 154,
                                columnNumber: 48
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                        lineNumber: 134,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "grid col-span-2 btn btn-ghost border-none bg-primary text-primary-content",
                        disabled: isSubmitting,
                        children: isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                        lineNumber: 157,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, this),
            successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-success",
                children: successMessage
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                lineNumber: 161,
                columnNumber: 32
            }, this),
            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-alerts",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
                lineNumber: 162,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/profile/components/form/NotificationForm.tsx",
        lineNumber: 62,
        columnNumber: 10
    }, this);
}
_s(NotificationForm, "Fp6UeMrnfd1RQdUVULVMjwX3r7I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = NotificationForm;
var _c;
__turbopack_context__.k.register(_c, "NotificationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/profile/components/form/ConfidentialForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotificationForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/axios.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function NotificationForm({ user }) {
    _s();
    // A modifier plus tard quand ce sera en db
    const [privacy, setPrivacy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fieldErrors, setFieldErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const { refreshUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleSubmitMedias = async (e)=>{
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setFieldErrors({});
        setIsSubmitting(true);
        try {
            const payload = {
                comment: comment ?? '',
                friendsRequests: friendsRequests ?? '',
                mentions: mentions ?? '',
                newSorties: newSorties ?? ''
            };
            const body = Object.fromEntries(Object.entries(payload).filter(([, v])=>v !== undefined && v !== null && v !== ''));
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch('/auth/profile', body);
            setSuccessMessage(data.message);
            await refreshUser();
        } catch (err) {
            const res = err.response?.data;
            if (err.response?.status === 422 && res?.errors) {
                const errors = {};
                Object.entries(res.errors).forEach(([key, messages])=>{
                    errors[key] = Array.isArray(messages) ? messages[0] : String(messages);
                });
                setFieldErrors(errors);
                setErrorMessage(res?.message ?? "Erreur de validation");
            } else {
                setErrorMessage(res?.message ?? "Erreur lors de la mise à jour du profil");
            }
        } finally{
            setIsSubmitting(false);
        }
    };
    // A voir apres
    // const handleDeleteAccount = async () => {
    //     try {
    //         await api.delete('/auth/profile');
    //         await refreshUser();
    //     } catch (err: any) {
    //         setErrorMessage(err.response?.data?.message ?? "Erreur lors de la suppression du compte");
    //     }
    // };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-bold",
                children: "Confidentialité"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                lineNumber: 71,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "grid grid-cols-2 gap-4",
                onSubmit: handleSubmitMedias,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Profil privé"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                                lineNumber: 76,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-border",
                                                children: "Seul vos amis peuvent voir votre profil"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                                lineNumber: 77,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                        lineNumber: 75,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `toggle text-base-content rounded-full ${privacy ? 'bg-primary' : 'bg-border'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: privacy,
                                                onChange: ()=>setPrivacy(!privacy)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                                lineNumber: 81,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "aria-label": "disabled",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "4",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M18 6 6 18"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "m6 6 12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                                        lineNumber: 84,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                                lineNumber: 82,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "aria-label": "enabled",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                    strokeLinejoin: "round",
                                                    strokeLinecap: "round",
                                                    strokeWidth: "4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M20 6 9 17l-5-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                                lineNumber: 86,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                        lineNumber: 80,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, this),
                            fieldErrors.privacy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.privacy
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                lineNumber: 93,
                                columnNumber: 45
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                        lineNumber: 73,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "delete_account",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn btn-ghost btn-xs text-sm p-0 border-none hover:bg-transparent",
                                            children: "Suprimer mon compte"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                            lineNumber: 99,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                        lineNumber: 98,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-border",
                                        children: "Supprimer toute vos données, cette action est irreversible"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                        lineNumber: 101,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                lineNumber: 97,
                                columnNumber: 21
                            }, this),
                            fieldErrors.friendsRequests && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-alerts",
                                children: fieldErrors.friendsRequests
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                                lineNumber: 104,
                                columnNumber: 53
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "grid col-span-2 btn btn-ghost border-none bg-primary text-primary-content",
                        disabled: isSubmitting,
                        children: isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                        lineNumber: 107,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                lineNumber: 72,
                columnNumber: 13
            }, this),
            successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-success",
                children: successMessage
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                lineNumber: 111,
                columnNumber: 32
            }, this),
            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-alerts",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
                lineNumber: 112,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/profile/components/form/ConfidentialForm.tsx",
        lineNumber: 70,
        columnNumber: 10
    }, this);
}
_s(NotificationForm, "dA2YFkFc1m9yEd4spwdbdULb5lQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = NotificationForm;
var _c;
__turbopack_context__.k.register(_c, "NotificationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/profile/components/Profile.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Profile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$form$2f$PersonnalForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/form/PersonnalForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$form$2f$SupplementaireForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/form/SupplementaireForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$form$2f$MediaForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/form/MediaForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$form$2f$NotificationForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/form/NotificationForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$form$2f$ConfidentialForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/form/ConfidentialForm.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function Profile(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "59e208de6af5dfdc68c3bce1ec28102193bc1b164bdb54947e32182063a71608") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "59e208de6af5dfdc68c3bce1ec28102193bc1b164bdb54947e32182063a71608";
    }
    const { user } = t0;
    let t1;
    if ($[1] !== user) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-6 w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$form$2f$PersonnalForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    user: user
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Profile.tsx",
                    lineNumber: 23,
                    columnNumber: 54
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$form$2f$SupplementaireForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    user: user
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Profile.tsx",
                    lineNumber: 23,
                    columnNumber: 83
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Profile.tsx",
            lineNumber: 23,
            columnNumber: 10
        }, this);
        $[1] = user;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== user) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-6 w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$form$2f$NotificationForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    user: user
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Profile.tsx",
                    lineNumber: 31,
                    columnNumber: 54
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$form$2f$MediaForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    user: user
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Profile.tsx",
                    lineNumber: 31,
                    columnNumber: 86
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$form$2f$ConfidentialForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    user: user
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Profile.tsx",
                    lineNumber: 31,
                    columnNumber: 111
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Profile.tsx",
            lineNumber: 31,
            columnNumber: 10
        }, this);
        $[3] = user;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t1 || $[6] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-6 mt-7 ml-6",
            children: [
                t1,
                t2
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Profile.tsx",
            lineNumber: 39,
            columnNumber: 10
        }, this);
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return t3;
}
_c = Profile;
var _c;
__turbopack_context__.k.register(_c, "Profile");
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
"[project]/src/app/profile/components/Activity.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Activity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$PostCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/PostCards.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Activity(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(28);
    if ($[0] !== "189815bbe064a94b49438e885fd721cf561f05c57a336fafd3a517a103525ab5") {
        for(let $i = 0; $i < 28; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "189815bbe064a94b49438e885fd721cf561f05c57a336fafd3a517a103525ab5";
    }
    const { user } = t0;
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    let t1;
    if ($[1] !== user.username) {
        t1 = [
            {
                id: 1,
                avatar_url: "/logo.png",
                username: user.username,
                content: "Bonjour, comment \xE7a va ?",
                created_at: "2026-03-10T12:00:00.000000Z",
                updated_at: "2026-03-10T12:00:00.000000Z"
            },
            {
                id: 2,
                avatar_url: "/logo.png",
                username: user.username,
                content: "Aujourd'hui j'ai fini la nouvelle saison de #SNK et c'etait vraiment lourd !",
                created_at: "2026-03-06T12:00:00.000000Z",
                updated_at: "2026-03-06T12:00:00.000000Z"
            },
            {
                id: 3,
                avatar_url: "/logo.png",
                username: user.username,
                content: "Mais qu'es ce qui lui arrive a Erenn ? Il a p\xE9t\xE9 son crane ou quoi ?",
                created_at: "2026-03-01T12:00:00.000000Z",
                updated_at: "2026-03-01T12:00:00.000000Z"
            },
            {
                id: 4,
                avatar_url: "/logo.png",
                username: user.username,
                content: "Woaw le Gear 5 c'est quoi cette dinguerie ?!",
                created_at: "2026-02-25T12:00:00.000000Z",
                updated_at: "2026-02-25T12:00:00.000000Z"
            },
            {
                id: 5,
                avatar_url: "/logo.png",
                username: user.username,
                content: "Je viens de commencer la nouvelle saison de #OnePiece et c'est vraiment une bombe !",
                created_at: "2026-02-18T12:00:00.000000Z",
                updated_at: "2026-02-18T12:00:00.000000Z"
            }
        ];
        $[1] = user.username;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const posts = t1;
    let t2;
    if ($[3] !== filter) {
        t2 = ({
            "Activity[<button>.onClick]": ()=>{
                if (filter === "trends") {
                    setFilter("all");
                } else {
                    setFilter("trends");
                }
            }
        })["Activity[<button>.onClick]"];
        $[3] = filter;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const t3 = `flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === "trends" ? "bg-alerts text-white" : "text-border"}`;
    let t4;
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/app/profile/components/Activity.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "hidden md:inline",
            children: "Tendances"
        }, void 0, false, {
            fileName: "[project]/src/app/profile/components/Activity.tsx",
            lineNumber: 85,
            columnNumber: 10
        }, this);
        $[5] = t4;
        $[6] = t5;
    } else {
        t4 = $[5];
        t5 = $[6];
    }
    let t6;
    if ($[7] !== t2 || $[8] !== t3) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t2,
            className: t3,
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Activity.tsx",
            lineNumber: 94,
            columnNumber: 10
        }, this);
        $[7] = t2;
        $[8] = t3;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== filter) {
        t7 = ({
            "Activity[<button>.onClick]": ()=>{
                if (filter === "recent") {
                    setFilter("all");
                } else {
                    setFilter("recent");
                }
            }
        })["Activity[<button>.onClick]"];
        $[10] = filter;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    const t8 = `flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === "recent" ? "bg-alerts text-white" : "text-border"}`;
    let t10;
    let t9;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/app/profile/components/Activity.tsx",
            lineNumber: 121,
            columnNumber: 10
        }, this);
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "hidden md:inline",
            children: "Récents"
        }, void 0, false, {
            fileName: "[project]/src/app/profile/components/Activity.tsx",
            lineNumber: 122,
            columnNumber: 11
        }, this);
        $[12] = t10;
        $[13] = t9;
    } else {
        t10 = $[12];
        t9 = $[13];
    }
    let t11;
    if ($[14] !== t7 || $[15] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t7,
            className: t8,
            children: [
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Activity.tsx",
            lineNumber: 131,
            columnNumber: 11
        }, this);
        $[14] = t7;
        $[15] = t8;
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] !== t11 || $[18] !== t6) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-5",
            children: [
                t6,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Activity.tsx",
            lineNumber: 140,
            columnNumber: 11
        }, this);
        $[17] = t11;
        $[18] = t6;
        $[19] = t12;
    } else {
        t12 = $[19];
    }
    let t13;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex px-4 gap-2 text-border",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Activity.tsx",
                    lineNumber: 149,
                    columnNumber: 56
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "hidden md:inline",
                    children: "Filtres"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Activity.tsx",
                    lineNumber: 149,
                    columnNumber: 87
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Activity.tsx",
            lineNumber: 149,
            columnNumber: 11
        }, this);
        $[20] = t13;
    } else {
        t13 = $[20];
    }
    let t14;
    if ($[21] !== t12) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between border border-border bg-accent rounded-full py-1 px-6",
            children: [
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Activity.tsx",
            lineNumber: 156,
            columnNumber: 11
        }, this);
        $[21] = t12;
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    let t15;
    if ($[23] !== posts) {
        t15 = posts.map(_ActivityPostsMap);
        $[23] = posts;
        $[24] = t15;
    } else {
        t15 = $[24];
    }
    let t16;
    if ($[25] !== t14 || $[26] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-8 p-7 ",
            children: [
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Activity.tsx",
            lineNumber: 172,
            columnNumber: 11
        }, this);
        $[25] = t14;
        $[26] = t15;
        $[27] = t16;
    } else {
        t16 = $[27];
    }
    return t16;
}
_s(Activity, "boPJerHaELAyf+PNkR+Y8+JetQg=");
_c = Activity;
function _ActivityPostsMap(post) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$PostCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        post: post
    }, post.id, false, {
        fileName: "[project]/src/app/profile/components/Activity.tsx",
        lineNumber: 182,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "Activity");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/profile/components/Friends.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Friends
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function Friends(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "d076435915048f25363249c8eb80ee077e7338a3f148d82581f223ec18efce75") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d076435915048f25363249c8eb80ee077e7338a3f148d82581f223ec18efce75";
    }
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-2xl font-bold",
                    children: "Mes amis"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Friends.tsx",
                    lineNumber: 13,
                    columnNumber: 101
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Cette partie sera disponible dans une prochaine mise à jour"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Friends.tsx",
                    lineNumber: 13,
                    columnNumber: 149
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Friends.tsx",
            lineNumber: 13,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    return t1;
}
_c = Friends;
var _c;
__turbopack_context__.k.register(_c, "Friends");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/profile/components/Likes.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Likes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function Likes(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "f2a90fe6fdf23e8609afab00a6a87d5a4f35c11c88bfdc1ebcc2c241534643ed") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f2a90fe6fdf23e8609afab00a6a87d5a4f35c11c88bfdc1ebcc2c241534643ed";
    }
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-2xl font-bold",
                    children: "Mes posts likés"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Likes.tsx",
                    lineNumber: 13,
                    columnNumber: 101
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Cette partie sera disponible dans une prochaine mise à jour"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Likes.tsx",
                    lineNumber: 13,
                    columnNumber: 156
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Likes.tsx",
            lineNumber: 13,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    return t1;
}
_c = Likes;
var _c;
__turbopack_context__.k.register(_c, "Likes");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/profile/components/Library.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Library
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function Library(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "0de0f700372ef9c0c44220b523dfb8d9c89c181a3f9068d1252f074c803934ea") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0de0f700372ef9c0c44220b523dfb8d9c89c181a3f9068d1252f074c803934ea";
    }
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-2xl font-bold",
                    children: "Ma bibliothèque"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Library.tsx",
                    lineNumber: 13,
                    columnNumber: 101
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Cette partie sera disponible dans une prochaine mise à jour"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Library.tsx",
                    lineNumber: 13,
                    columnNumber: 156
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Library.tsx",
            lineNumber: 13,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    return t1;
}
_c = Library;
var _c;
__turbopack_context__.k.register(_c, "Library");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/profile/components/Groups.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Groups
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function Groups(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "a7aeafcb495574465f2a6d51b09acc1d388755d33de938bd60e0731a9a00bc9f") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a7aeafcb495574465f2a6d51b09acc1d388755d33de938bd60e0731a9a00bc9f";
    }
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-2xl font-bold",
                    children: "Mes groupes de discussion"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Groups.tsx",
                    lineNumber: 13,
                    columnNumber: 101
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Cette partie sera disponible dans une prochaine mise à jour"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/components/Groups.tsx",
                    lineNumber: 13,
                    columnNumber: 166
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/components/Groups.tsx",
            lineNumber: 13,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    return t1;
}
_c = Groups;
var _c;
__turbopack_context__.k.register(_c, "Groups");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/profile/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-client] (ecmascript) <export default as CircleUser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Profile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/Profile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Activity$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/Activity.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Friends$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/Friends.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Likes$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/Likes.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Library$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/Library.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Groups$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/profile/components/Groups.tsx [app-client] (ecmascript)");
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
;
;
;
function ProfilePage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(91);
    if ($[0] !== "37142a951a2870a7e5e025f9263ec5340bcd3f4c62abacf2f276a68a80aeab82") {
        for(let $i = 0; $i < 91; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "37142a951a2870a7e5e025f9263ec5340bcd3f4c62abacf2f276a68a80aeab82";
    }
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("activities");
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    if (!user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirect"])("/login");
    }
    let t0;
    if ($[1] !== user.banner_url) {
        t0 = user?.banner_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: user.banner_url,
            alt: "Banni\xE8re",
            fill: true,
            className: "object-cover",
            sizes: "(max-width: 1200px) 100vw, 1500px"
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 32,
            columnNumber: 29
        }, this) : null;
        $[1] = user.banner_url;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== t0) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-primary overflow-hidden rounded-[15px]",
            children: t0
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 40,
            columnNumber: 10
        }, this);
        $[3] = t0;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    let t2;
    if ($[5] !== user.avatar_url) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "absolute -bottom-3 left-10 bg-accent p-1 rounded-[15px]",
            children: user.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: user.avatar_url,
                alt: "Avatar",
                width: 60,
                height: 60
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 48,
                columnNumber: 100
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUser$3e$__["CircleUser"], {
                size: 50,
                strokeWidth: 1.5,
                className: "p-3"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 48,
                columnNumber: 170
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 48,
            columnNumber: 10
        }, this);
        $[5] = user.avatar_url;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== user.username) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col absolute bottom-1 left-30",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg",
                    children: user.username
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/page.tsx",
                    lineNumber: 56,
                    columnNumber: 67
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-border",
                    children: [
                        "@",
                        user.username
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/profile/page.tsx",
                    lineNumber: 56,
                    columnNumber: 109
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        $[7] = user.username;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    if ($[9] !== t2 || $[10] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative z-10 flex items-end p-5 h-full gap-4",
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 64,
            columnNumber: 10
        }, this);
        $[9] = t2;
        $[10] = t3;
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    let t5;
    if ($[12] !== t1 || $[13] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "relative w-full h-[20vh] rounded-[15px] mb-8 overflow-visible",
            children: [
                t1,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 73,
            columnNumber: 10
        }, this);
        $[12] = t1;
        $[13] = t4;
        $[14] = t5;
    } else {
        t5 = $[14];
    }
    const t6 = user.bio || "Pas encore de bio";
    let t7;
    if ($[15] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "pb-2",
            children: t6
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 83,
            columnNumber: 10
        }, this);
        $[15] = t6;
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    let t8;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
            size: 15,
            className: "text-primary"
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    const t9 = user.localisation || "Non renseign\xE9";
    let t10;
    if ($[18] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "flex items-center gap-2",
            children: [
                t8,
                " ",
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 99,
            columnNumber: 11
        }, this);
        $[18] = t9;
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    let t11;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
            size: 15,
            className: "text-primary"
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 107,
            columnNumber: 11
        }, this);
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] !== user.created_at) {
        t12 = new Date(user.created_at).toLocaleDateString();
        $[21] = user.created_at;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    let t13;
    if ($[23] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "flex items-center gap-2",
            children: [
                t11,
                " Membre depuis le ",
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 122,
            columnNumber: 11
        }, this);
        $[23] = t12;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                    size: 15,
                    className: "text-primary"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/page.tsx",
                    lineNumber: 130,
                    columnNumber: 50
                }, this),
                " X oeuvres suivies"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 130,
            columnNumber: 11
        }, this);
        $[25] = t14;
    } else {
        t14 = $[25];
    }
    let t15;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                    size: 15,
                    className: "text-primary"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/page.tsx",
                    lineNumber: 137,
                    columnNumber: 50
                }, this),
                " X amis"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[26] = t15;
    } else {
        t15 = $[26];
    }
    let t16;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                    size: 15,
                    className: "text-primary"
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/page.tsx",
                    lineNumber: 144,
                    columnNumber: 50
                }, this),
                " X posts"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 144,
            columnNumber: 11
        }, this);
        $[27] = t16;
    } else {
        t16 = $[27];
    }
    let t17;
    if ($[28] !== t10 || $[29] !== t13 || $[30] !== t7) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col justify-center gap-1 bg-accent p-5 border border-border rounded-[15px]",
            children: [
                t7,
                t10,
                t13,
                t14,
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 151,
            columnNumber: 11
        }, this);
        $[28] = t10;
        $[29] = t13;
        $[30] = t7;
        $[31] = t17;
    } else {
        t17 = $[31];
    }
    const t18 = `btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === "activities" ? "bg-primary text-primary-content" : "text-border"}`;
    let t19;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = ({
            "ProfilePage[<button>.onClick]": ()=>setActiveTab("activities")
        })["ProfilePage[<button>.onClick]"];
        $[32] = t19;
    } else {
        t19 = $[32];
    }
    let t20;
    if ($[33] !== t18) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: t18,
                onClick: t19,
                children: "Posts"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 171,
                columnNumber: 15
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 171,
            columnNumber: 11
        }, this);
        $[33] = t18;
        $[34] = t20;
    } else {
        t20 = $[34];
    }
    const t21 = `btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === "friends" ? "bg-primary text-primary-content" : "text-border"}`;
    let t22;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = ({
            "ProfilePage[<button>.onClick]": ()=>setActiveTab("friends")
        })["ProfilePage[<button>.onClick]"];
        $[35] = t22;
    } else {
        t22 = $[35];
    }
    let t23;
    if ($[36] !== t21) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: t21,
                onClick: t22,
                children: "Amis"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 189,
                columnNumber: 15
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 189,
            columnNumber: 11
        }, this);
        $[36] = t21;
        $[37] = t23;
    } else {
        t23 = $[37];
    }
    const t24 = `btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === "likes" ? "bg-primary text-primary-content" : "text-border"}`;
    let t25;
    if ($[38] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = ({
            "ProfilePage[<button>.onClick]": ()=>setActiveTab("likes")
        })["ProfilePage[<button>.onClick]"];
        $[38] = t25;
    } else {
        t25 = $[38];
    }
    let t26;
    if ($[39] !== t24) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: t24,
                onClick: t25,
                children: "Likes"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 207,
                columnNumber: 15
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 207,
            columnNumber: 11
        }, this);
        $[39] = t24;
        $[40] = t26;
    } else {
        t26 = $[40];
    }
    const t27 = `btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === "library" ? "bg-primary text-primary-content" : "text-border"}`;
    let t28;
    if ($[41] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = ({
            "ProfilePage[<button>.onClick]": ()=>setActiveTab("library")
        })["ProfilePage[<button>.onClick]"];
        $[41] = t28;
    } else {
        t28 = $[41];
    }
    let t29;
    if ($[42] !== t27) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: t27,
                onClick: t28,
                children: "Bibliothèque"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 225,
                columnNumber: 15
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 225,
            columnNumber: 11
        }, this);
        $[42] = t27;
        $[43] = t29;
    } else {
        t29 = $[43];
    }
    const t30 = `btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === "groups" ? "bg-primary text-primary-content" : "text-border"}`;
    let t31;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = ({
            "ProfilePage[<button>.onClick]": ()=>setActiveTab("groups")
        })["ProfilePage[<button>.onClick]"];
        $[44] = t31;
    } else {
        t31 = $[44];
    }
    let t32;
    if ($[45] !== t30) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: t30,
                onClick: t31,
                children: "Groupes"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 243,
                columnNumber: 15
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 243,
            columnNumber: 11
        }, this);
        $[45] = t30;
        $[46] = t32;
    } else {
        t32 = $[46];
    }
    const t33 = `btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === "profile" ? "bg-primary text-primary-content" : "text-border"}`;
    let t34;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = ({
            "ProfilePage[<button>.onClick]": ()=>setActiveTab("profile")
        })["ProfilePage[<button>.onClick]"];
        $[47] = t34;
    } else {
        t34 = $[47];
    }
    let t35;
    if ($[48] !== t33) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: t33,
                onClick: t34,
                children: "Paramètres"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 261,
                columnNumber: 15
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 261,
            columnNumber: 11
        }, this);
        $[48] = t33;
        $[49] = t35;
    } else {
        t35 = $[49];
    }
    let t36;
    if ($[50] !== t20 || $[51] !== t23 || $[52] !== t26 || $[53] !== t29 || $[54] !== t32 || $[55] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-5 py-2 border border-border rounded-[15px] bg-accent",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                children: [
                    t20,
                    t23,
                    t26,
                    t29,
                    t32,
                    t35
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 269,
                columnNumber: 84
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 269,
            columnNumber: 11
        }, this);
        $[50] = t20;
        $[51] = t23;
        $[52] = t26;
        $[53] = t29;
        $[54] = t32;
        $[55] = t35;
        $[56] = t36;
    } else {
        t36 = $[56];
    }
    let t37;
    if ($[57] !== t17 || $[58] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-auto flex flex-col gap-5 py-7 ",
            children: [
                t17,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 282,
            columnNumber: 11
        }, this);
        $[57] = t17;
        $[58] = t36;
        $[59] = t37;
    } else {
        t37 = $[59];
    }
    let t38;
    if ($[60] !== activeTab || $[61] !== user) {
        t38 = activeTab === "activities" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Activity$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            user: user
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 291,
            columnNumber: 41
        }, this);
        $[60] = activeTab;
        $[61] = user;
        $[62] = t38;
    } else {
        t38 = $[62];
    }
    let t39;
    if ($[63] !== activeTab || $[64] !== user) {
        t39 = activeTab === "friends" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Friends$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            user: user
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 300,
            columnNumber: 38
        }, this);
        $[63] = activeTab;
        $[64] = user;
        $[65] = t39;
    } else {
        t39 = $[65];
    }
    let t40;
    if ($[66] !== activeTab || $[67] !== user) {
        t40 = activeTab === "likes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Likes$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            user: user
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 309,
            columnNumber: 36
        }, this);
        $[66] = activeTab;
        $[67] = user;
        $[68] = t40;
    } else {
        t40 = $[68];
    }
    let t41;
    if ($[69] !== activeTab || $[70] !== user) {
        t41 = activeTab === "library" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Library$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            user: user
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 318,
            columnNumber: 38
        }, this);
        $[69] = activeTab;
        $[70] = user;
        $[71] = t41;
    } else {
        t41 = $[71];
    }
    let t42;
    if ($[72] !== activeTab || $[73] !== user) {
        t42 = activeTab === "groups" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Groups$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            user: user
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 327,
            columnNumber: 37
        }, this);
        $[72] = activeTab;
        $[73] = user;
        $[74] = t42;
    } else {
        t42 = $[74];
    }
    let t43;
    if ($[75] !== activeTab || $[76] !== user) {
        t43 = activeTab === "profile" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$components$2f$Profile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            user: user
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 336,
            columnNumber: 38
        }, this);
        $[75] = activeTab;
        $[76] = user;
        $[77] = t43;
    } else {
        t43 = $[77];
    }
    let t44;
    if ($[78] !== t38 || $[79] !== t39 || $[80] !== t40 || $[81] !== t41 || $[82] !== t42 || $[83] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "col-span-3 min-h-[70vh]",
            children: [
                t38,
                t39,
                t40,
                t41,
                t42,
                t43
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 345,
            columnNumber: 11
        }, this);
        $[78] = t38;
        $[79] = t39;
        $[80] = t40;
        $[81] = t41;
        $[82] = t42;
        $[83] = t43;
        $[84] = t44;
    } else {
        t44 = $[84];
    }
    let t45;
    if ($[85] !== t37 || $[86] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "grid grid-cols-4",
            children: [
                t37,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 358,
            columnNumber: 11
        }, this);
        $[85] = t37;
        $[86] = t44;
        $[87] = t45;
    } else {
        t45 = $[87];
    }
    let t46;
    if ($[88] !== t45 || $[89] !== t5) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "max-w-[1500px] mx-auto min-h-[80vh] h-full p-13",
            children: [
                t5,
                t45
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 367,
            columnNumber: 11
        }, this);
        $[88] = t45;
        $[89] = t5;
        $[90] = t46;
    } else {
        t46 = $[90];
    }
    return t46;
}
_s(ProfilePage, "EQ/VmGoVEY1kCsLrd/+zv3hb0EI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ProfilePage;
var _c;
__turbopack_context__.k.register(_c, "ProfilePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_fcefbfe9._.js.map