import * as Schema from "effect/Schema";
import * as Cause from "effect/Cause";
import { SyntaxKind } from "typescript";

//#region ../../node_modules/.pnpm/@typescript-eslint+types@8.59.3/node_modules/@typescript-eslint/types/dist/generated/ast-spec.d.ts
declare type Accessibility = 'private' | 'protected' | 'public';
declare type AccessorProperty = AccessorPropertyComputedName | AccessorPropertyNonComputedName;
declare interface AccessorPropertyComputedName extends PropertyDefinitionComputedNameBase {
  type: AST_NODE_TYPES.AccessorProperty;
}
declare interface AccessorPropertyNonComputedName extends PropertyDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.AccessorProperty;
}
declare interface ArrayExpression extends BaseNode {
  type: AST_NODE_TYPES.ArrayExpression;
  /**
   * an element will be `null` in the case of a sparse array: `[1, ,3]`
   */
  elements: (Expression | SpreadElement | null)[];
}
declare interface ArrayPattern extends BaseNode {
  type: AST_NODE_TYPES.ArrayPattern;
  decorators: Decorator[];
  elements: (DestructuringPattern | null)[];
  optional: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare interface ArrowFunctionExpression extends BaseNode {
  type: AST_NODE_TYPES.ArrowFunctionExpression;
  async: boolean;
  body: BlockStatement | Expression;
  expression: boolean;
  generator: false;
  id: null;
  params: Parameter[];
  returnType: TSTypeAnnotation | undefined;
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface AssignmentExpression extends BaseNode {
  type: AST_NODE_TYPES.AssignmentExpression;
  left: Expression;
  operator: ValueOf<AssignmentOperatorToText>;
  right: Expression;
}
declare interface AssignmentOperatorToText {
  [SyntaxKind.AmpersandAmpersandEqualsToken]: '&&=';
  [SyntaxKind.AmpersandEqualsToken]: '&=';
  [SyntaxKind.AsteriskAsteriskEqualsToken]: '**=';
  [SyntaxKind.AsteriskEqualsToken]: '*=';
  [SyntaxKind.BarBarEqualsToken]: '||=';
  [SyntaxKind.BarEqualsToken]: '|=';
  [SyntaxKind.CaretEqualsToken]: '^=';
  [SyntaxKind.EqualsToken]: '=';
  [SyntaxKind.GreaterThanGreaterThanEqualsToken]: '>>=';
  [SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken]: '>>>=';
  [SyntaxKind.LessThanLessThanEqualsToken]: '<<=';
  [SyntaxKind.MinusEqualsToken]: '-=';
  [SyntaxKind.PercentEqualsToken]: '%=';
  [SyntaxKind.PlusEqualsToken]: '+=';
  [SyntaxKind.QuestionQuestionEqualsToken]: '??=';
  [SyntaxKind.SlashEqualsToken]: '/=';
}
declare interface AssignmentPattern extends BaseNode {
  type: AST_NODE_TYPES.AssignmentPattern;
  decorators: Decorator[];
  left: BindingName;
  optional: boolean;
  right: Expression;
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare enum AST_NODE_TYPES {
  AccessorProperty = "AccessorProperty",
  ArrayExpression = "ArrayExpression",
  ArrayPattern = "ArrayPattern",
  ArrowFunctionExpression = "ArrowFunctionExpression",
  AssignmentExpression = "AssignmentExpression",
  AssignmentPattern = "AssignmentPattern",
  AwaitExpression = "AwaitExpression",
  BinaryExpression = "BinaryExpression",
  BlockStatement = "BlockStatement",
  BreakStatement = "BreakStatement",
  CallExpression = "CallExpression",
  CatchClause = "CatchClause",
  ChainExpression = "ChainExpression",
  ClassBody = "ClassBody",
  ClassDeclaration = "ClassDeclaration",
  ClassExpression = "ClassExpression",
  ConditionalExpression = "ConditionalExpression",
  ContinueStatement = "ContinueStatement",
  DebuggerStatement = "DebuggerStatement",
  Decorator = "Decorator",
  DoWhileStatement = "DoWhileStatement",
  EmptyStatement = "EmptyStatement",
  ExportAllDeclaration = "ExportAllDeclaration",
  ExportDefaultDeclaration = "ExportDefaultDeclaration",
  ExportNamedDeclaration = "ExportNamedDeclaration",
  ExportSpecifier = "ExportSpecifier",
  ExpressionStatement = "ExpressionStatement",
  ForInStatement = "ForInStatement",
  ForOfStatement = "ForOfStatement",
  ForStatement = "ForStatement",
  FunctionDeclaration = "FunctionDeclaration",
  FunctionExpression = "FunctionExpression",
  Identifier = "Identifier",
  IfStatement = "IfStatement",
  ImportAttribute = "ImportAttribute",
  ImportDeclaration = "ImportDeclaration",
  ImportDefaultSpecifier = "ImportDefaultSpecifier",
  ImportExpression = "ImportExpression",
  ImportNamespaceSpecifier = "ImportNamespaceSpecifier",
  ImportSpecifier = "ImportSpecifier",
  JSXAttribute = "JSXAttribute",
  JSXClosingElement = "JSXClosingElement",
  JSXClosingFragment = "JSXClosingFragment",
  JSXElement = "JSXElement",
  JSXEmptyExpression = "JSXEmptyExpression",
  JSXExpressionContainer = "JSXExpressionContainer",
  JSXFragment = "JSXFragment",
  JSXIdentifier = "JSXIdentifier",
  JSXMemberExpression = "JSXMemberExpression",
  JSXNamespacedName = "JSXNamespacedName",
  JSXOpeningElement = "JSXOpeningElement",
  JSXOpeningFragment = "JSXOpeningFragment",
  JSXSpreadAttribute = "JSXSpreadAttribute",
  JSXSpreadChild = "JSXSpreadChild",
  JSXText = "JSXText",
  LabeledStatement = "LabeledStatement",
  Literal = "Literal",
  LogicalExpression = "LogicalExpression",
  MemberExpression = "MemberExpression",
  MetaProperty = "MetaProperty",
  MethodDefinition = "MethodDefinition",
  NewExpression = "NewExpression",
  ObjectExpression = "ObjectExpression",
  ObjectPattern = "ObjectPattern",
  PrivateIdentifier = "PrivateIdentifier",
  Program = "Program",
  Property = "Property",
  PropertyDefinition = "PropertyDefinition",
  RestElement = "RestElement",
  ReturnStatement = "ReturnStatement",
  SequenceExpression = "SequenceExpression",
  SpreadElement = "SpreadElement",
  StaticBlock = "StaticBlock",
  Super = "Super",
  SwitchCase = "SwitchCase",
  SwitchStatement = "SwitchStatement",
  TaggedTemplateExpression = "TaggedTemplateExpression",
  TemplateElement = "TemplateElement",
  TemplateLiteral = "TemplateLiteral",
  ThisExpression = "ThisExpression",
  ThrowStatement = "ThrowStatement",
  TryStatement = "TryStatement",
  UnaryExpression = "UnaryExpression",
  UpdateExpression = "UpdateExpression",
  VariableDeclaration = "VariableDeclaration",
  VariableDeclarator = "VariableDeclarator",
  WhileStatement = "WhileStatement",
  WithStatement = "WithStatement",
  YieldExpression = "YieldExpression",
  TSAbstractAccessorProperty = "TSAbstractAccessorProperty",
  TSAbstractKeyword = "TSAbstractKeyword",
  TSAbstractMethodDefinition = "TSAbstractMethodDefinition",
  TSAbstractPropertyDefinition = "TSAbstractPropertyDefinition",
  TSAnyKeyword = "TSAnyKeyword",
  TSArrayType = "TSArrayType",
  TSAsExpression = "TSAsExpression",
  TSAsyncKeyword = "TSAsyncKeyword",
  TSBigIntKeyword = "TSBigIntKeyword",
  TSBooleanKeyword = "TSBooleanKeyword",
  TSCallSignatureDeclaration = "TSCallSignatureDeclaration",
  TSClassImplements = "TSClassImplements",
  TSConditionalType = "TSConditionalType",
  TSConstructorType = "TSConstructorType",
  TSConstructSignatureDeclaration = "TSConstructSignatureDeclaration",
  TSDeclareFunction = "TSDeclareFunction",
  TSDeclareKeyword = "TSDeclareKeyword",
  TSEmptyBodyFunctionExpression = "TSEmptyBodyFunctionExpression",
  TSEnumBody = "TSEnumBody",
  TSEnumDeclaration = "TSEnumDeclaration",
  TSEnumMember = "TSEnumMember",
  TSExportAssignment = "TSExportAssignment",
  TSExportKeyword = "TSExportKeyword",
  TSExternalModuleReference = "TSExternalModuleReference",
  TSFunctionType = "TSFunctionType",
  TSImportEqualsDeclaration = "TSImportEqualsDeclaration",
  TSImportType = "TSImportType",
  TSIndexedAccessType = "TSIndexedAccessType",
  TSIndexSignature = "TSIndexSignature",
  TSInferType = "TSInferType",
  TSInstantiationExpression = "TSInstantiationExpression",
  TSInterfaceBody = "TSInterfaceBody",
  TSInterfaceDeclaration = "TSInterfaceDeclaration",
  TSInterfaceHeritage = "TSInterfaceHeritage",
  TSIntersectionType = "TSIntersectionType",
  TSIntrinsicKeyword = "TSIntrinsicKeyword",
  TSLiteralType = "TSLiteralType",
  TSMappedType = "TSMappedType",
  TSMethodSignature = "TSMethodSignature",
  TSModuleBlock = "TSModuleBlock",
  TSModuleDeclaration = "TSModuleDeclaration",
  TSNamedTupleMember = "TSNamedTupleMember",
  TSNamespaceExportDeclaration = "TSNamespaceExportDeclaration",
  TSNeverKeyword = "TSNeverKeyword",
  TSNonNullExpression = "TSNonNullExpression",
  TSNullKeyword = "TSNullKeyword",
  TSNumberKeyword = "TSNumberKeyword",
  TSObjectKeyword = "TSObjectKeyword",
  TSOptionalType = "TSOptionalType",
  TSParameterProperty = "TSParameterProperty",
  TSPrivateKeyword = "TSPrivateKeyword",
  TSPropertySignature = "TSPropertySignature",
  TSProtectedKeyword = "TSProtectedKeyword",
  TSPublicKeyword = "TSPublicKeyword",
  TSQualifiedName = "TSQualifiedName",
  TSReadonlyKeyword = "TSReadonlyKeyword",
  TSRestType = "TSRestType",
  TSSatisfiesExpression = "TSSatisfiesExpression",
  TSStaticKeyword = "TSStaticKeyword",
  TSStringKeyword = "TSStringKeyword",
  TSSymbolKeyword = "TSSymbolKeyword",
  TSTemplateLiteralType = "TSTemplateLiteralType",
  TSThisType = "TSThisType",
  TSTupleType = "TSTupleType",
  TSTypeAliasDeclaration = "TSTypeAliasDeclaration",
  TSTypeAnnotation = "TSTypeAnnotation",
  TSTypeAssertion = "TSTypeAssertion",
  TSTypeLiteral = "TSTypeLiteral",
  TSTypeOperator = "TSTypeOperator",
  TSTypeParameter = "TSTypeParameter",
  TSTypeParameterDeclaration = "TSTypeParameterDeclaration",
  TSTypeParameterInstantiation = "TSTypeParameterInstantiation",
  TSTypePredicate = "TSTypePredicate",
  TSTypeQuery = "TSTypeQuery",
  TSTypeReference = "TSTypeReference",
  TSUndefinedKeyword = "TSUndefinedKeyword",
  TSUnionType = "TSUnionType",
  TSUnknownKeyword = "TSUnknownKeyword",
  TSVoidKeyword = "TSVoidKeyword"
}
declare enum AST_TOKEN_TYPES {
  Boolean = "Boolean",
  Identifier = "Identifier",
  JSXIdentifier = "JSXIdentifier",
  PrivateIdentifier = "PrivateIdentifier",
  JSXText = "JSXText",
  Keyword = "Keyword",
  Null = "Null",
  Numeric = "Numeric",
  Punctuator = "Punctuator",
  RegularExpression = "RegularExpression",
  String = "String",
  Template = "Template",
  Block = "Block",
  Line = "Line"
}
declare interface AwaitExpression extends BaseNode {
  type: AST_NODE_TYPES.AwaitExpression;
  argument: Expression;
}
declare interface BaseNode extends NodeOrTokenData {
  type: AST_NODE_TYPES;
}
declare interface BaseToken extends NodeOrTokenData {
  type: AST_TOKEN_TYPES;
  value: string;
}
declare interface BigIntLiteral extends LiteralBase {
  bigint: string;
  value: bigint | null;
}
declare type BinaryExpression = PrivateInExpression | SymmetricBinaryExpression;
declare interface BinaryOperatorToText {
  [SyntaxKind.AmpersandAmpersandToken]: '&&';
  [SyntaxKind.AmpersandToken]: '&';
  [SyntaxKind.AsteriskAsteriskToken]: '**';
  [SyntaxKind.AsteriskToken]: '*';
  [SyntaxKind.BarBarToken]: '||';
  [SyntaxKind.BarToken]: '|';
  [SyntaxKind.CaretToken]: '^';
  [SyntaxKind.EqualsEqualsEqualsToken]: '===';
  [SyntaxKind.EqualsEqualsToken]: '==';
  [SyntaxKind.ExclamationEqualsEqualsToken]: '!==';
  [SyntaxKind.ExclamationEqualsToken]: '!=';
  [SyntaxKind.GreaterThanEqualsToken]: '>=';
  [SyntaxKind.GreaterThanGreaterThanGreaterThanToken]: '>>>';
  [SyntaxKind.GreaterThanGreaterThanToken]: '>>';
  [SyntaxKind.GreaterThanToken]: '>';
  [SyntaxKind.InKeyword]: 'in';
  [SyntaxKind.InstanceOfKeyword]: 'instanceof';
  [SyntaxKind.LessThanEqualsToken]: '<=';
  [SyntaxKind.LessThanLessThanToken]: '<<';
  [SyntaxKind.LessThanToken]: '<';
  [SyntaxKind.MinusToken]: '-';
  [SyntaxKind.PercentToken]: '%';
  [SyntaxKind.PlusToken]: '+';
  [SyntaxKind.SlashToken]: '/';
}
declare type BindingName = BindingPattern | Identifier;
declare type BindingPattern = ArrayPattern | ObjectPattern;
declare interface BlockComment extends BaseToken {
  type: AST_TOKEN_TYPES.Block;
}
declare interface BlockStatement extends BaseNode {
  type: AST_NODE_TYPES.BlockStatement;
  body: Statement[];
}
declare interface BooleanLiteral extends LiteralBase {
  raw: 'false' | 'true';
  value: boolean;
}
declare interface BooleanToken extends BaseToken {
  type: AST_TOKEN_TYPES.Boolean;
}
declare interface BreakStatement extends BaseNode {
  type: AST_NODE_TYPES.BreakStatement;
  label: Identifier | null;
}
declare interface CallExpression extends BaseNode {
  type: AST_NODE_TYPES.CallExpression;
  arguments: CallExpressionArgument[];
  callee: Expression;
  optional: boolean;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare type CallExpressionArgument = Expression | SpreadElement;
declare interface CatchClause extends BaseNode {
  type: AST_NODE_TYPES.CatchClause;
  body: BlockStatement;
  param: BindingName | null;
}
declare type ChainElement = CallExpression | MemberExpression | TSNonNullExpression;
declare interface ChainExpression extends BaseNode {
  type: AST_NODE_TYPES.ChainExpression;
  expression: ChainElement;
}
declare interface ClassBase extends BaseNode {
  /**
   * Whether the class is an abstract class.
   * @example
   * ```ts
   * abstract class Foo {}
   * ```
   */
  abstract: boolean;
  /**
   * The class body.
   */
  body: ClassBody;
  /**
   * Whether the class has been `declare`d:
   * @example
   * ```ts
   * declare class Foo {}
   * ```
   */
  declare: boolean;
  /**
   * The decorators declared for the class.
   * @example
   * ```ts
   * @deco
   * class Foo {}
   * ```
   */
  decorators: Decorator[];
  /**
   * The class's name.
   * - For a `ClassExpression` this may be `null` if the name is omitted.
   * - For a `ClassDeclaration` this may be `null` if and only if the parent is
   *   an `ExportDefaultDeclaration`.
   */
  id: Identifier | null;
  /**
   * The implemented interfaces for the class.
   */
  implements: TSClassImplements[];
  /**
   * The super class this class extends.
   */
  superClass: LeftHandSideExpression | null;
  /**
   * The generic type parameters passed to the superClass.
   */
  superTypeArguments: TSTypeParameterInstantiation | undefined;
  /**
   * The generic type parameters declared for the class.
   */
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface ClassBody extends BaseNode {
  type: AST_NODE_TYPES.ClassBody;
  body: ClassElement[];
}
declare type ClassDeclaration = ClassDeclarationWithName | ClassDeclarationWithOptionalName;
declare interface ClassDeclarationBase extends ClassBase {
  type: AST_NODE_TYPES.ClassDeclaration;
}
/**
 * A normal class declaration:
 * ```
 * class A {}
 * ```
 */
declare interface ClassDeclarationWithName extends ClassDeclarationBase {
  id: Identifier;
}
/**
 * Default-exported class declarations have optional names:
 * ```
 * export default class {}
 * ```
 */
declare interface ClassDeclarationWithOptionalName extends ClassDeclarationBase {
  id: Identifier | null;
}
declare type ClassElement = AccessorProperty | MethodDefinition | PropertyDefinition | StaticBlock | TSAbstractAccessorProperty | TSAbstractMethodDefinition | TSAbstractPropertyDefinition | TSIndexSignature;
declare interface ClassExpression extends ClassBase {
  type: AST_NODE_TYPES.ClassExpression;
  abstract: false;
  declare: false;
}
declare interface ClassMethodDefinitionNonComputedNameBase extends MethodDefinitionBase {
  computed: false;
  key: ClassPropertyNameNonComputed;
}
declare interface ClassPropertyDefinitionNonComputedNameBase extends PropertyDefinitionBase {
  computed: false;
  key: ClassPropertyNameNonComputed;
}
declare type ClassPropertyNameNonComputed = PrivateIdentifier | PropertyNameNonComputed;
declare type Comment = BlockComment | LineComment;
declare interface ConditionalExpression extends BaseNode {
  type: AST_NODE_TYPES.ConditionalExpression;
  alternate: Expression;
  consequent: Expression;
  test: Expression;
}
declare interface ConstDeclaration extends LetOrConstOrVarDeclarationBase {
  /**
   * In a `declare const` declaration, the declarators may have initializers, but
   * not definite assignment assertions. Each declarator cannot have both an
   * initializer and a type annotation.
   *
   * Even if the declaration has no `declare`, it may still be ambient and have
   * no initializer.
   */
  declarations: VariableDeclaratorMaybeInit[];
  kind: 'const';
}
declare interface ContinueStatement extends BaseNode {
  type: AST_NODE_TYPES.ContinueStatement;
  label: Identifier | null;
}
declare interface DebuggerStatement extends BaseNode {
  type: AST_NODE_TYPES.DebuggerStatement;
}
declare interface Decorator extends BaseNode {
  type: AST_NODE_TYPES.Decorator;
  expression: LeftHandSideExpression;
}
declare type DefaultExportDeclarations = ClassDeclarationWithOptionalName | Expression | FunctionDeclarationWithName | FunctionDeclarationWithOptionalName | TSDeclareFunction | TSEnumDeclaration | TSInterfaceDeclaration | TSModuleDeclaration | TSTypeAliasDeclaration | VariableDeclaration;
declare type DestructuringPattern = ArrayPattern | AssignmentPattern | Identifier | MemberExpression | ObjectPattern | RestElement;
declare interface DoWhileStatement extends BaseNode {
  type: AST_NODE_TYPES.DoWhileStatement;
  body: Statement;
  test: Expression;
}
declare interface EmptyStatement extends BaseNode {
  type: AST_NODE_TYPES.EmptyStatement;
}
declare type EntityName = Identifier | ThisExpression | TSQualifiedName;
declare interface ExportAllDeclaration extends BaseNode {
  type: AST_NODE_TYPES.ExportAllDeclaration;
  /**
   * The assertions declared for the export.
   * @example
   * ```ts
   * export * from 'mod' assert \{ type: 'json' \};
   * ```
   * @deprecated Replaced with {@link `attributes`}.
   */
  assertions: ImportAttribute[];
  /**
   * The attributes declared for the export.
   * @example
   * ```ts
   * export * from 'mod' with \{ type: 'json' \};
   * ```
   */
  attributes: ImportAttribute[];
  /**
   * The name for the exported items (`as X`). `null` if no name is assigned.
   */
  exported: Identifier | null;
  /**
   * The kind of the export.
   */
  exportKind: ExportKind;
  /**
   * The source module being exported from.
   */
  source: StringLiteral;
}
declare type ExportAndImportKind = 'type' | 'value';
declare interface ExportDefaultDeclaration extends BaseNode {
  type: AST_NODE_TYPES.ExportDefaultDeclaration;
  /**
   * The declaration being exported.
   */
  declaration: DefaultExportDeclarations;
  /**
   * The kind of the export. Always `value` for default exports.
   */
  exportKind: 'value';
}
declare type ExportKind = ExportAndImportKind;
declare type ExportNamedDeclaration = ExportNamedDeclarationWithoutSourceWithMultiple | ExportNamedDeclarationWithoutSourceWithSingle | ExportNamedDeclarationWithSource;
declare interface ExportNamedDeclarationBase extends BaseNode {
  type: AST_NODE_TYPES.ExportNamedDeclaration;
  /**
   * The assertions declared for the export.
   * @example
   * ```ts
   * export { foo } from 'mod' assert \{ type: 'json' \};
   * ```
   * This will be an empty array if `source` is `null`
   * @deprecated Replaced with {@link `attributes`}.
   */
  assertions: ImportAttribute[];
  /**
   * The attributes declared for the export.
   * @example
   * ```ts
   * export { foo } from 'mod' with \{ type: 'json' \};
   * ```
   * This will be an empty array if `source` is `null`
   */
  attributes: ImportAttribute[];
  /**
   * The exported declaration.
   * @example
   * ```ts
   * export const x = 1;
   * ```
   * This will be `null` if `source` is not `null`, or if there are `specifiers`
   */
  declaration: NamedExportDeclarations | null;
  /**
   * The kind of the export.
   */
  exportKind: ExportKind;
  /**
   * The source module being exported from.
   */
  source: StringLiteral | null;
  /**
   * The specifiers being exported.
   * @example
   * ```ts
   * export { a, b };
   * ```
   * This will be an empty array if `declaration` is not `null`
   */
  specifiers: ExportSpecifier[];
}
/**
 * Exporting names from the current module.
 * ```
 * export {};
 * export { a, b };
 * ```
 */
declare interface ExportNamedDeclarationWithoutSourceWithMultiple extends ExportNamedDeclarationBase {
  /**
   * This will always be an empty array.
   * @deprecated Replaced with {@link `attributes`}.
   */
  assertions: ImportAttribute[];
  /**
   * This will always be an empty array.
   */
  attributes: ImportAttribute[];
  declaration: null;
  source: null;
  specifiers: ExportSpecifierWithIdentifierLocal[];
}
/**
 * Exporting a single named declaration.
 * ```
 * export const x = 1;
 * ```
 */
declare interface ExportNamedDeclarationWithoutSourceWithSingle extends ExportNamedDeclarationBase {
  /**
   * This will always be an empty array.
   * @deprecated Replaced with {@link `attributes`}.
   */
  assertions: ImportAttribute[];
  /**
   * This will always be an empty array.
   */
  attributes: ImportAttribute[];
  declaration: NamedExportDeclarations;
  source: null;
  /**
   * This will always be an empty array.
   */
  specifiers: ExportSpecifierWithIdentifierLocal[];
}
/**
 * Export names from another module.
 * ```
 * export { a, b } from 'mod';
 * ```
 */
declare interface ExportNamedDeclarationWithSource extends ExportNamedDeclarationBase {
  declaration: null;
  source: StringLiteral;
}
declare type ExportSpecifier = ExportSpecifierWithIdentifierLocal | ExportSpecifierWithStringOrLiteralLocal;
declare interface ExportSpecifierBase extends BaseNode {
  type: AST_NODE_TYPES.ExportSpecifier;
  exported: Identifier | StringLiteral;
  exportKind: ExportKind;
  local: Identifier | StringLiteral;
}
declare interface ExportSpecifierWithIdentifierLocal extends ExportSpecifierBase {
  local: Identifier;
}
declare interface ExportSpecifierWithStringOrLiteralLocal extends ExportSpecifierBase {
  local: Identifier | StringLiteral;
}
declare type Expression = ArrayExpression | ArrayPattern | ArrowFunctionExpression | AssignmentExpression | AwaitExpression | BinaryExpression | CallExpression | ChainExpression | ClassExpression | ConditionalExpression | FunctionExpression | Identifier | ImportExpression | JSXElement | JSXFragment | LiteralExpression | LogicalExpression | MemberExpression | MetaProperty | NewExpression | ObjectExpression | ObjectPattern | SequenceExpression | Super | TaggedTemplateExpression | TemplateLiteral | ThisExpression | TSAsExpression | TSInstantiationExpression | TSNonNullExpression | TSSatisfiesExpression | TSTypeAssertion | UnaryExpression | UpdateExpression | YieldExpression;
declare interface ExpressionStatement extends BaseNode {
  type: AST_NODE_TYPES.ExpressionStatement;
  directive: string | undefined;
  expression: Expression;
}
declare type ForInitialiser = Expression | LetOrConstOrVarDeclaration;
declare interface ForInStatement extends BaseNode {
  type: AST_NODE_TYPES.ForInStatement;
  body: Statement;
  left: ForInitialiser;
  right: Expression;
}
declare type ForOfInitialiser = Expression | LetOrConstOrVarDeclaration | UsingInForOfDeclaration;
declare interface ForOfStatement extends BaseNode {
  type: AST_NODE_TYPES.ForOfStatement;
  await: boolean;
  body: Statement;
  left: ForOfInitialiser;
  right: Expression;
}
declare interface ForStatement extends BaseNode {
  type: AST_NODE_TYPES.ForStatement;
  body: Statement;
  init: Expression | ForInitialiser | null;
  test: Expression | null;
  update: Expression | null;
}
declare interface FunctionBase extends BaseNode {
  /**
   * Whether the function is async:
   * ```
   * async function foo() {}
   * const x = async function () {}
   * const x = async () => {}
   * ```
   */
  async: boolean;
  /**
   * The body of the function.
   * - For an `ArrowFunctionExpression` this may be an `Expression` or `BlockStatement`.
   * - For a `FunctionDeclaration` or `FunctionExpression` this is always a `BlockStatement`.
   * - For a `TSDeclareFunction` this is always `undefined`.
   * - For a `TSEmptyBodyFunctionExpression` this is always `null`.
   */
  body: BlockStatement | Expression | null | undefined;
  /**
   * This is only `true` if and only if the node is a `TSDeclareFunction` and it has `declare`:
   * ```
   * declare function foo() {}
   * ```
   */
  declare: boolean;
  /**
   * This is only ever `true` if and only the node is an `ArrowFunctionExpression` and the body
   * is an expression:
   * ```
   * (() => 1)
   * ```
   */
  expression: boolean;
  /**
   * Whether the function is a generator function:
   * ```
   * function *foo() {}
   * const x = function *() {}
   * ```
   * This is always `false` for arrow functions as they cannot be generators.
   */
  generator: boolean;
  /**
   * The function's name.
   * - For an `ArrowFunctionExpression` this is always `null`.
   * - For a `FunctionExpression` this may be `null` if the name is omitted.
   * - For a `FunctionDeclaration` or `TSDeclareFunction` this may be `null` if
   *   and only if the parent is an `ExportDefaultDeclaration`.
   */
  id: Identifier | null;
  /**
   * The list of parameters declared for the function.
   */
  params: Parameter[];
  /**
   * The return type annotation for the function.
   */
  returnType: TSTypeAnnotation | undefined;
  /**
   * The generic type parameter declaration for the function.
   */
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare type FunctionDeclaration = FunctionDeclarationWithName | FunctionDeclarationWithOptionalName;
declare interface FunctionDeclarationBase extends FunctionBase {
  type: AST_NODE_TYPES.FunctionDeclaration;
  body: BlockStatement;
  declare: false;
  expression: false;
}
/**
 * A normal function declaration:
 * ```
 * function f() {}
 * ```
 */
declare interface FunctionDeclarationWithName extends FunctionDeclarationBase {
  id: Identifier;
}
/**
 * Default-exported function declarations have optional names:
 * ```
 * export default function () {}
 * ```
 */
declare interface FunctionDeclarationWithOptionalName extends FunctionDeclarationBase {
  id: Identifier | null;
}
declare interface FunctionExpression extends FunctionBase {
  type: AST_NODE_TYPES.FunctionExpression;
  body: BlockStatement;
  expression: false;
}
declare type FunctionLike = ArrowFunctionExpression | FunctionDeclaration | FunctionExpression | TSDeclareFunction | TSEmptyBodyFunctionExpression;
declare interface Identifier extends BaseNode {
  type: AST_NODE_TYPES.Identifier;
  decorators: Decorator[];
  name: string;
  optional: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare interface IdentifierToken extends BaseToken {
  type: AST_TOKEN_TYPES.Identifier;
}
declare interface IfStatement extends BaseNode {
  type: AST_NODE_TYPES.IfStatement;
  alternate: Statement | null;
  consequent: Statement;
  test: Expression;
}
declare interface ImportAttribute extends BaseNode {
  type: AST_NODE_TYPES.ImportAttribute;
  key: Identifier | Literal;
  value: Literal;
}
declare type ImportClause = ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier;
declare interface ImportDeclaration extends BaseNode {
  type: AST_NODE_TYPES.ImportDeclaration;
  /**
   * The assertions declared for the export.
   * @example
   * ```ts
   * import * from 'mod' assert \{ type: 'json' \};
   * ```
   * @deprecated Replaced with {@link `attributes`}.
   */
  assertions: ImportAttribute[];
  /**
   * The attributes declared for the export.
   * @example
   * ```ts
   * import * from 'mod' with \{ type: 'json' \};
   * ```
   */
  attributes: ImportAttribute[];
  /**
   * The kind of the import.
   */
  importKind: ImportKind;
  /**
   * The source module being imported from.
   */
  source: StringLiteral;
  /**
   * The specifiers being imported.
   * If this is an empty array then either there are no specifiers:
   * ```
   * import {} from 'mod';
   * ```
   * Or it is a side-effect import:
   * ```
   * import 'mod';
   * ```
   */
  specifiers: ImportClause[];
}
declare interface ImportDefaultSpecifier extends BaseNode {
  type: AST_NODE_TYPES.ImportDefaultSpecifier;
  local: Identifier;
}
declare interface ImportExpression extends BaseNode {
  type: AST_NODE_TYPES.ImportExpression;
  /**
   * The attributes declared for the dynamic import.
   * @example
   * ```ts
   * import('mod', \{ assert: \{ type: 'json' \} \});
   * ```
   * @deprecated Replaced with {@link `options`}.
   */
  attributes: Expression | null;
  /**
   * The options bag declared for the dynamic import.
   * @example
   * ```ts
   * import('mod', \{ assert: \{ type: 'json' \} \});
   * ```
   */
  options: Expression | null;
  source: Expression;
}
declare type ImportKind = ExportAndImportKind;
declare interface ImportNamespaceSpecifier extends BaseNode {
  type: AST_NODE_TYPES.ImportNamespaceSpecifier;
  local: Identifier;
}
declare interface ImportSpecifier extends BaseNode {
  type: AST_NODE_TYPES.ImportSpecifier;
  imported: Identifier | StringLiteral;
  importKind: ImportKind;
  local: Identifier;
}
declare interface JSXAttribute extends BaseNode {
  type: AST_NODE_TYPES.JSXAttribute;
  name: JSXIdentifier | JSXNamespacedName;
  value: JSXElement | JSXExpression | Literal | null;
}
declare type JSXChild = JSXElement | JSXExpression | JSXFragment | JSXText;
declare interface JSXClosingElement extends BaseNode {
  type: AST_NODE_TYPES.JSXClosingElement;
  name: JSXTagNameExpression;
}
declare interface JSXClosingFragment extends BaseNode {
  type: AST_NODE_TYPES.JSXClosingFragment;
}
declare interface JSXElement extends BaseNode {
  type: AST_NODE_TYPES.JSXElement;
  children: JSXChild[];
  closingElement: JSXClosingElement | null;
  openingElement: JSXOpeningElement;
}
declare interface JSXEmptyExpression extends BaseNode {
  type: AST_NODE_TYPES.JSXEmptyExpression;
}
declare type JSXExpression = JSXExpressionContainer | JSXSpreadChild;
declare interface JSXExpressionContainer extends BaseNode {
  type: AST_NODE_TYPES.JSXExpressionContainer;
  expression: Expression | JSXEmptyExpression;
}
declare interface JSXFragment extends BaseNode {
  type: AST_NODE_TYPES.JSXFragment;
  children: JSXChild[];
  closingFragment: JSXClosingFragment;
  openingFragment: JSXOpeningFragment;
}
declare interface JSXIdentifier extends BaseNode {
  type: AST_NODE_TYPES.JSXIdentifier;
  name: string;
}
declare interface JSXIdentifierToken extends BaseToken {
  type: AST_TOKEN_TYPES.JSXIdentifier;
}
declare interface JSXMemberExpression extends BaseNode {
  type: AST_NODE_TYPES.JSXMemberExpression;
  object: JSXTagNameExpression;
  property: JSXIdentifier;
}
declare interface JSXNamespacedName extends BaseNode {
  type: AST_NODE_TYPES.JSXNamespacedName;
  name: JSXIdentifier;
  namespace: JSXIdentifier;
}
declare interface JSXOpeningElement extends BaseNode {
  type: AST_NODE_TYPES.JSXOpeningElement;
  attributes: (JSXAttribute | JSXSpreadAttribute)[];
  name: JSXTagNameExpression;
  selfClosing: boolean;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare interface JSXOpeningFragment extends BaseNode {
  type: AST_NODE_TYPES.JSXOpeningFragment;
}
declare interface JSXSpreadAttribute extends BaseNode {
  type: AST_NODE_TYPES.JSXSpreadAttribute;
  argument: Expression;
}
declare interface JSXSpreadChild extends BaseNode {
  type: AST_NODE_TYPES.JSXSpreadChild;
  expression: Expression | JSXEmptyExpression;
}
declare type JSXTagNameExpression = JSXIdentifier | JSXMemberExpression | JSXNamespacedName;
declare interface JSXText extends BaseNode {
  type: AST_NODE_TYPES.JSXText;
  raw: string;
  value: string;
}
declare interface JSXTextToken extends BaseToken {
  type: AST_TOKEN_TYPES.JSXText;
}
declare interface KeywordToken extends BaseToken {
  type: AST_TOKEN_TYPES.Keyword;
}
declare interface LabeledStatement extends BaseNode {
  type: AST_NODE_TYPES.LabeledStatement;
  body: Statement;
  label: Identifier;
}
declare type LeftHandSideExpression = ArrayExpression | ArrayPattern | ArrowFunctionExpression | CallExpression | ClassExpression | FunctionExpression | Identifier | JSXElement | JSXFragment | LiteralExpression | MemberExpression | MetaProperty | ObjectExpression | ObjectPattern | SequenceExpression | Super | TaggedTemplateExpression | ThisExpression | TSAsExpression | TSNonNullExpression | TSTypeAssertion;
declare type LetOrConstOrVarDeclaration = ConstDeclaration | LetOrVarDeclaredDeclaration | LetOrVarNonDeclaredDeclaration;
declare interface LetOrConstOrVarDeclarationBase extends BaseNode {
  type: AST_NODE_TYPES.VariableDeclaration;
  /**
   * The variables declared by this declaration.
   * Always non-empty.
   * @example
   * ```ts
   * let x;
   * let y, z;
   * ```
   */
  declarations: LetOrConstOrVarDeclarator[];
  /**
   * Whether the declaration is `declare`d
   * @example
   * ```ts
   * declare const x = 1;
   * ```
   */
  declare: boolean;
  /**
   * The keyword used to declare the variable(s)
   * @example
   * ```ts
   * const x = 1;
   * let y = 2;
   * var z = 3;
   * ```
   */
  kind: 'const' | 'let' | 'var';
}
declare type LetOrConstOrVarDeclarator = VariableDeclaratorDefiniteAssignment | VariableDeclaratorMaybeInit | VariableDeclaratorNoInit;
declare interface LetOrVarDeclaredDeclaration extends LetOrConstOrVarDeclarationBase {
  /**
   * In a `declare let` declaration, the declarators must not have definite assignment
   * assertions or initializers.
   *
   * @example
   * ```ts
   * using x = 1;
   * using y =1, z = 2;
   * ```
   */
  declarations: VariableDeclaratorNoInit[];
  declare: true;
  kind: 'let' | 'var';
}
declare interface LetOrVarNonDeclaredDeclaration extends LetOrConstOrVarDeclarationBase {
  /**
   * In a `let`/`var` declaration, the declarators may have definite assignment
   * assertions or initializers, but not both.
   */
  declarations: (VariableDeclaratorDefiniteAssignment | VariableDeclaratorMaybeInit)[];
  declare: false;
  kind: 'let' | 'var';
}
declare interface LineComment extends BaseToken {
  type: AST_TOKEN_TYPES.Line;
}
declare type Literal = BigIntLiteral | BooleanLiteral | NullLiteral | NumberLiteral | RegExpLiteral | StringLiteral;
declare interface LiteralBase extends BaseNode {
  type: AST_NODE_TYPES.Literal;
  raw: string;
  value: bigint | boolean | number | string | RegExp | null;
}
declare type LiteralExpression = Literal | TemplateLiteral;
declare interface LogicalExpression extends BaseNode {
  type: AST_NODE_TYPES.LogicalExpression;
  left: Expression;
  operator: '&&' | '??' | '||';
  right: Expression;
}
declare type MemberExpression = MemberExpressionComputedName | MemberExpressionNonComputedName;
declare interface MemberExpressionBase extends BaseNode {
  computed: boolean;
  object: Expression;
  optional: boolean;
  property: Expression | Identifier | PrivateIdentifier;
}
declare interface MemberExpressionComputedName extends MemberExpressionBase {
  type: AST_NODE_TYPES.MemberExpression;
  computed: true;
  property: Expression;
}
declare interface MemberExpressionNonComputedName extends MemberExpressionBase {
  type: AST_NODE_TYPES.MemberExpression;
  computed: false;
  property: Identifier | PrivateIdentifier;
}
declare interface MetaProperty extends BaseNode {
  type: AST_NODE_TYPES.MetaProperty;
  meta: Identifier;
  property: Identifier;
}
declare type MethodDefinition = MethodDefinitionComputedName | MethodDefinitionNonComputedName;
/** this should not be directly used - instead use MethodDefinitionComputedNameBase or MethodDefinitionNonComputedNameBase */
declare interface MethodDefinitionBase extends BaseNode {
  accessibility: Accessibility | undefined;
  computed: boolean;
  decorators: Decorator[];
  key: PropertyName;
  kind: 'constructor' | 'get' | 'method' | 'set';
  optional: boolean;
  override: boolean;
  static: boolean;
  value: FunctionExpression | TSEmptyBodyFunctionExpression;
}
declare interface MethodDefinitionComputedName extends MethodDefinitionComputedNameBase {
  type: AST_NODE_TYPES.MethodDefinition;
}
declare interface MethodDefinitionComputedNameBase extends MethodDefinitionBase {
  computed: true;
  key: PropertyNameComputed;
}
declare interface MethodDefinitionNonComputedName extends ClassMethodDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.MethodDefinition;
}
declare interface MethodDefinitionNonComputedNameBase extends MethodDefinitionBase {
  computed: false;
  key: PropertyNameNonComputed;
}
declare type NamedExportDeclarations = ClassDeclarationWithName | ClassDeclarationWithOptionalName | FunctionDeclarationWithName | FunctionDeclarationWithOptionalName | TSDeclareFunction | TSEnumDeclaration | TSImportEqualsDeclaration | TSInterfaceDeclaration | TSModuleDeclaration | TSTypeAliasDeclaration | VariableDeclaration;
declare interface NewExpression extends BaseNode {
  type: AST_NODE_TYPES.NewExpression;
  arguments: CallExpressionArgument[];
  callee: Expression;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare type Node = AccessorProperty | ArrayExpression | ArrayPattern | ArrowFunctionExpression | AssignmentExpression | AssignmentPattern | AwaitExpression | BinaryExpression | BlockStatement | BreakStatement | CallExpression | CatchClause | ChainExpression | ClassBody | ClassDeclaration | ClassExpression | ConditionalExpression | ContinueStatement | DebuggerStatement | Decorator | DoWhileStatement | EmptyStatement | ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration | ExportSpecifier | ExpressionStatement | ForInStatement | ForOfStatement | ForStatement | FunctionDeclaration | FunctionExpression | Identifier | IfStatement | ImportAttribute | ImportDeclaration | ImportDefaultSpecifier | ImportExpression | ImportNamespaceSpecifier | ImportSpecifier | JSXAttribute | JSXClosingElement | JSXClosingFragment | JSXElement | JSXEmptyExpression | JSXExpressionContainer | JSXFragment | JSXIdentifier | JSXMemberExpression | JSXNamespacedName | JSXOpeningElement | JSXOpeningFragment | JSXSpreadAttribute | JSXSpreadChild | JSXText | LabeledStatement | Literal | LogicalExpression | MemberExpression | MetaProperty | MethodDefinition | NewExpression | ObjectExpression | ObjectPattern | PrivateIdentifier | Program | Property | PropertyDefinition | RestElement | ReturnStatement | SequenceExpression | SpreadElement | StaticBlock | Super | SwitchCase | SwitchStatement | TaggedTemplateExpression | TemplateElement | TemplateLiteral | ThisExpression | ThrowStatement | TryStatement | TSAbstractAccessorProperty | TSAbstractKeyword | TSAbstractMethodDefinition | TSAbstractPropertyDefinition | TSAnyKeyword | TSArrayType | TSAsExpression | TSAsyncKeyword | TSBigIntKeyword | TSBooleanKeyword | TSCallSignatureDeclaration | TSClassImplements | TSConditionalType | TSConstructorType | TSConstructSignatureDeclaration | TSDeclareFunction | TSDeclareKeyword | TSEmptyBodyFunctionExpression | TSEnumBody | TSEnumDeclaration | TSEnumMember | TSExportAssignment | TSExportKeyword | TSExternalModuleReference | TSFunctionType | TSImportEqualsDeclaration | TSImportType | TSIndexedAccessType | TSIndexSignature | TSInferType | TSInstantiationExpression | TSInterfaceBody | TSInterfaceDeclaration | TSInterfaceHeritage | TSIntersectionType | TSIntrinsicKeyword | TSLiteralType | TSMappedType | TSMethodSignature | TSModuleBlock | TSModuleDeclaration | TSNamedTupleMember | TSNamespaceExportDeclaration | TSNeverKeyword | TSNonNullExpression | TSNullKeyword | TSNumberKeyword | TSObjectKeyword | TSOptionalType | TSParameterProperty | TSPrivateKeyword | TSPropertySignature | TSProtectedKeyword | TSPublicKeyword | TSQualifiedName | TSReadonlyKeyword | TSRestType | TSSatisfiesExpression | TSStaticKeyword | TSStringKeyword | TSSymbolKeyword | TSTemplateLiteralType | TSThisType | TSTupleType | TSTypeAliasDeclaration | TSTypeAnnotation | TSTypeAssertion | TSTypeLiteral | TSTypeOperator | TSTypeParameter | TSTypeParameterDeclaration | TSTypeParameterInstantiation | TSTypePredicate | TSTypeQuery | TSTypeReference | TSUndefinedKeyword | TSUnionType | TSUnknownKeyword | TSVoidKeyword | UnaryExpression | UpdateExpression | VariableDeclaration | VariableDeclarator | WhileStatement | WithStatement | YieldExpression;
declare interface NodeOrTokenData {
  type: string;
  /**
   * The source location information of the node.
   *
   * The loc property is defined as nullable by ESTree, but ESLint requires this property.
   */
  loc: SourceLocation;
  range: Range;
}
declare interface NullLiteral extends LiteralBase {
  raw: 'null';
  value: null;
}
declare interface NullToken extends BaseToken {
  type: AST_TOKEN_TYPES.Null;
}
declare interface NumberLiteral extends LiteralBase {
  value: number;
}
declare interface NumericToken extends BaseToken {
  type: AST_TOKEN_TYPES.Numeric;
}
declare interface ObjectExpression extends BaseNode {
  type: AST_NODE_TYPES.ObjectExpression;
  properties: ObjectLiteralElement[];
}
declare type ObjectLiteralElement = Property | SpreadElement;
declare interface ObjectPattern extends BaseNode {
  type: AST_NODE_TYPES.ObjectPattern;
  decorators: Decorator[];
  optional: boolean;
  properties: (Property | RestElement)[];
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare type Parameter = ArrayPattern | AssignmentPattern | Identifier | ObjectPattern | RestElement | TSParameterProperty;
declare type ParameterPropertyParameter = (AssignmentPattern & {
  left: Identifier;
}) | Identifier;
declare interface Position {
  /**
   * Column number on the line (0-indexed)
   */
  column: number;
  /**
   * Line number (1-indexed)
   */
  line: number;
}
declare interface PrivateIdentifier extends BaseNode {
  type: AST_NODE_TYPES.PrivateIdentifier;
  name: string;
}
declare interface PrivateIdentifierToken extends BaseToken {
  type: AST_TOKEN_TYPES.PrivateIdentifier;
}
declare interface PrivateInExpression extends BaseNode {
  type: AST_NODE_TYPES.BinaryExpression;
  left: PrivateIdentifier;
  operator: 'in';
  right: Expression;
}
declare interface Program extends NodeOrTokenData {
  type: AST_NODE_TYPES.Program;
  body: ProgramStatement[];
  comments: Comment[] | undefined;
  sourceType: 'module' | 'script';
  tokens: Token[] | undefined;
}
declare type ProgramStatement = ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration | ImportDeclaration | Statement | TSImportEqualsDeclaration | TSNamespaceExportDeclaration;
declare type Property = PropertyComputedName | PropertyNonComputedName;
declare interface PropertyBase extends BaseNode {
  type: AST_NODE_TYPES.Property;
  computed: boolean;
  key: PropertyName;
  kind: 'get' | 'init' | 'set';
  method: boolean;
  optional: boolean;
  shorthand: boolean;
  value: AssignmentPattern | BindingName | Expression | TSEmptyBodyFunctionExpression;
}
declare interface PropertyComputedName extends PropertyBase {
  computed: true;
  key: PropertyNameComputed;
}
declare type PropertyDefinition = PropertyDefinitionComputedName | PropertyDefinitionNonComputedName;
declare interface PropertyDefinitionBase extends BaseNode {
  accessibility: Accessibility | undefined;
  computed: boolean;
  declare: boolean;
  decorators: Decorator[];
  definite: boolean;
  key: PropertyName;
  optional: boolean;
  override: boolean;
  readonly: boolean;
  static: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
  value: Expression | null;
}
declare interface PropertyDefinitionComputedName extends PropertyDefinitionComputedNameBase {
  type: AST_NODE_TYPES.PropertyDefinition;
}
declare interface PropertyDefinitionComputedNameBase extends PropertyDefinitionBase {
  computed: true;
  key: PropertyNameComputed;
}
declare interface PropertyDefinitionNonComputedName extends ClassPropertyDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.PropertyDefinition;
}
declare interface PropertyDefinitionNonComputedNameBase extends PropertyDefinitionBase {
  computed: false;
  key: PropertyNameNonComputed;
}
declare type PropertyName = ClassPropertyNameNonComputed | PropertyNameComputed | PropertyNameNonComputed;
declare type PropertyNameComputed = Expression;
declare type PropertyNameNonComputed = Identifier | NumberLiteral | StringLiteral;
declare interface PropertyNonComputedName extends PropertyBase {
  computed: false;
  key: PropertyNameNonComputed;
}
declare interface PunctuatorToken extends BaseToken {
  type: AST_TOKEN_TYPES.Punctuator;
  value: ValueOf<PunctuatorTokenToText>;
}
declare interface PunctuatorTokenToText extends AssignmentOperatorToText {
  [SyntaxKind.AmpersandAmpersandToken]: '&&';
  [SyntaxKind.AmpersandToken]: '&';
  [SyntaxKind.AsteriskAsteriskToken]: '**';
  [SyntaxKind.AsteriskToken]: '*';
  [SyntaxKind.AtToken]: '@';
  [SyntaxKind.BacktickToken]: '`';
  [SyntaxKind.BarBarToken]: '||';
  [SyntaxKind.BarToken]: '|';
  [SyntaxKind.CaretToken]: '^';
  [SyntaxKind.CloseBraceToken]: '}';
  [SyntaxKind.CloseBracketToken]: ']';
  [SyntaxKind.CloseParenToken]: ')';
  [SyntaxKind.ColonToken]: ':';
  [SyntaxKind.CommaToken]: ',';
  [SyntaxKind.DotDotDotToken]: '...';
  [SyntaxKind.DotToken]: '.';
  [SyntaxKind.EqualsEqualsEqualsToken]: '===';
  [SyntaxKind.EqualsEqualsToken]: '==';
  [SyntaxKind.EqualsGreaterThanToken]: '=>';
  [SyntaxKind.ExclamationEqualsEqualsToken]: '!==';
  [SyntaxKind.ExclamationEqualsToken]: '!=';
  [SyntaxKind.ExclamationToken]: '!';
  [SyntaxKind.GreaterThanEqualsToken]: '>=';
  [SyntaxKind.GreaterThanGreaterThanGreaterThanToken]: '>>>';
  [SyntaxKind.GreaterThanGreaterThanToken]: '>>';
  [SyntaxKind.GreaterThanToken]: '>';
  [SyntaxKind.HashToken]: '#';
  [SyntaxKind.LessThanEqualsToken]: '<=';
  [SyntaxKind.LessThanLessThanToken]: '<<';
  [SyntaxKind.LessThanSlashToken]: '</';
  [SyntaxKind.LessThanToken]: '<';
  [SyntaxKind.MinusMinusToken]: '--';
  [SyntaxKind.MinusToken]: '-';
  [SyntaxKind.OpenBraceToken]: '{';
  [SyntaxKind.OpenBracketToken]: '[';
  [SyntaxKind.OpenParenToken]: '(';
  [SyntaxKind.PercentToken]: '%';
  [SyntaxKind.PlusPlusToken]: '++';
  [SyntaxKind.PlusToken]: '+';
  [SyntaxKind.QuestionDotToken]: '?.';
  [SyntaxKind.QuestionQuestionToken]: '??';
  [SyntaxKind.QuestionToken]: '?';
  [SyntaxKind.SemicolonToken]: ';';
  [SyntaxKind.SlashToken]: '/';
  [SyntaxKind.TildeToken]: '~';
}
/**
 * An array of two numbers.
 * Both numbers are a 0-based index which is the position in the array of source code characters.
 * The first is the start position of the node, the second is the end position of the node.
 */
declare type Range = [number, number];
declare interface RegExpLiteral extends LiteralBase {
  regex: {
    flags: string;
    pattern: string;
  };
  value: RegExp | null;
}
declare interface RegularExpressionToken extends BaseToken {
  type: AST_TOKEN_TYPES.RegularExpression;
  regex: {
    flags: string;
    pattern: string;
  };
}
declare interface RestElement extends BaseNode {
  type: AST_NODE_TYPES.RestElement;
  argument: DestructuringPattern;
  decorators: Decorator[];
  optional: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
  value: AssignmentPattern | undefined;
}
declare interface ReturnStatement extends BaseNode {
  type: AST_NODE_TYPES.ReturnStatement;
  argument: Expression | null;
}
declare interface SequenceExpression extends BaseNode {
  type: AST_NODE_TYPES.SequenceExpression;
  expressions: Expression[];
}
declare interface SourceLocation {
  /**
   * The position of the first character after the parsed source region
   */
  end: Position;
  /**
   * The position of the first character of the parsed source region
   */
  start: Position;
}
declare interface SpreadElement extends BaseNode {
  type: AST_NODE_TYPES.SpreadElement;
  argument: Expression;
}
declare type Statement = BlockStatement | BreakStatement | ClassDeclarationWithName | ContinueStatement | DebuggerStatement | DoWhileStatement | EmptyStatement | ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration | ExpressionStatement | ForInStatement | ForOfStatement | ForStatement | FunctionDeclarationWithName | IfStatement | ImportDeclaration | LabeledStatement | ReturnStatement | SwitchStatement | ThrowStatement | TryStatement | TSDeclareFunction | TSEnumDeclaration | TSExportAssignment | TSImportEqualsDeclaration | TSInterfaceDeclaration | TSModuleDeclaration | TSNamespaceExportDeclaration | TSTypeAliasDeclaration | VariableDeclaration | WhileStatement | WithStatement;
declare interface StaticBlock extends BaseNode {
  type: AST_NODE_TYPES.StaticBlock;
  body: Statement[];
}
declare interface StringLiteral extends LiteralBase {
  value: string;
}
declare interface StringToken extends BaseToken {
  type: AST_TOKEN_TYPES.String;
}
declare interface Super extends BaseNode {
  type: AST_NODE_TYPES.Super;
}
declare interface SwitchCase extends BaseNode {
  type: AST_NODE_TYPES.SwitchCase;
  consequent: Statement[];
  test: Expression | null;
}
declare interface SwitchStatement extends BaseNode {
  type: AST_NODE_TYPES.SwitchStatement;
  cases: SwitchCase[];
  discriminant: Expression;
}
declare interface SymmetricBinaryExpression extends BaseNode {
  type: AST_NODE_TYPES.BinaryExpression;
  left: Expression;
  operator: ValueOf<BinaryOperatorToText>;
  right: Expression;
}
declare interface TaggedTemplateExpression extends BaseNode {
  type: AST_NODE_TYPES.TaggedTemplateExpression;
  quasi: TemplateLiteral;
  tag: Expression;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare interface TemplateElement extends BaseNode {
  type: AST_NODE_TYPES.TemplateElement;
  tail: boolean;
  value: {
    cooked: string | null;
    raw: string;
  };
}
declare interface TemplateLiteral extends BaseNode {
  type: AST_NODE_TYPES.TemplateLiteral;
  expressions: Expression[];
  quasis: TemplateElement[];
}
declare interface TemplateToken extends BaseToken {
  type: AST_TOKEN_TYPES.Template;
}
declare interface ThisExpression extends BaseNode {
  type: AST_NODE_TYPES.ThisExpression;
}
declare interface ThrowStatement extends BaseNode {
  type: AST_NODE_TYPES.ThrowStatement;
  argument: Expression;
}
declare type Token = BooleanToken | Comment | IdentifierToken | JSXIdentifierToken | JSXTextToken | KeywordToken | NullToken | NumericToken | PrivateIdentifierToken | PunctuatorToken | RegularExpressionToken | StringToken | TemplateToken;
declare interface TryStatement extends BaseNode {
  type: AST_NODE_TYPES.TryStatement;
  block: BlockStatement;
  finalizer: BlockStatement | null;
  handler: CatchClause | null;
}
declare type TSAbstractAccessorProperty = TSAbstractAccessorPropertyComputedName | TSAbstractAccessorPropertyNonComputedName;
declare interface TSAbstractAccessorPropertyComputedName extends PropertyDefinitionComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractAccessorProperty;
  value: null;
}
declare interface TSAbstractAccessorPropertyNonComputedName extends PropertyDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractAccessorProperty;
  value: null;
}
declare interface TSAbstractKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSAbstractKeyword;
}
declare type TSAbstractMethodDefinition = TSAbstractMethodDefinitionComputedName | TSAbstractMethodDefinitionNonComputedName;
declare interface TSAbstractMethodDefinitionComputedName extends MethodDefinitionComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractMethodDefinition;
}
declare interface TSAbstractMethodDefinitionNonComputedName extends MethodDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractMethodDefinition;
}
declare type TSAbstractPropertyDefinition = TSAbstractPropertyDefinitionComputedName | TSAbstractPropertyDefinitionNonComputedName;
declare interface TSAbstractPropertyDefinitionComputedName extends PropertyDefinitionComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractPropertyDefinition;
  value: null;
}
declare interface TSAbstractPropertyDefinitionNonComputedName extends PropertyDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractPropertyDefinition;
  value: null;
}
declare interface TSAnyKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSAnyKeyword;
}
declare interface TSArrayType extends BaseNode {
  type: AST_NODE_TYPES.TSArrayType;
  elementType: TypeNode;
}
declare interface TSAsExpression extends BaseNode {
  type: AST_NODE_TYPES.TSAsExpression;
  expression: Expression;
  typeAnnotation: TypeNode;
}
declare interface TSAsyncKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSAsyncKeyword;
}
declare interface TSBigIntKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSBigIntKeyword;
}
declare interface TSBooleanKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSBooleanKeyword;
}
declare interface TSCallSignatureDeclaration extends TSFunctionSignatureBase {
  type: AST_NODE_TYPES.TSCallSignatureDeclaration;
}
declare interface TSClassImplements extends TSHeritageBase {
  type: AST_NODE_TYPES.TSClassImplements;
}
declare interface TSConditionalType extends BaseNode {
  type: AST_NODE_TYPES.TSConditionalType;
  checkType: TypeNode;
  extendsType: TypeNode;
  falseType: TypeNode;
  trueType: TypeNode;
}
declare interface TSConstructorType extends TSFunctionSignatureBase {
  type: AST_NODE_TYPES.TSConstructorType;
  abstract: boolean;
}
declare interface TSConstructSignatureDeclaration extends TSFunctionSignatureBase {
  type: AST_NODE_TYPES.TSConstructSignatureDeclaration;
}
declare type TSDeclareFunction = TSDeclareFunctionNoDeclare | TSDeclareFunctionWithDeclare;
declare interface TSDeclareFunctionBase extends FunctionBase {
  type: AST_NODE_TYPES.TSDeclareFunction;
  /**
   * TS1183: An implementation cannot be declared in ambient contexts.
   */
  body: undefined;
  /**
   * Whether the declaration has `declare` modifier.
   */
  declare: boolean;
  expression: false;
}
/**
 * Function declaration without the `declare` keyword:
 * ```
 * function foo(): void;
 * ```
 * This can either be an overload signature or a declaration in an ambient context
 * (e.g. `declare module`)
 */
declare interface TSDeclareFunctionNoDeclare extends TSDeclareFunctionBase {
  declare: false;
  /**
   * - TS1221: Generators are not allowed in an ambient context.
   * - TS1222: An overload signature cannot be declared as a generator.
   */
  generator: false;
}
/**
 * Function declaration with the `declare` keyword:
 * ```
 * declare function foo(): void;
 * ```
 */
declare interface TSDeclareFunctionWithDeclare extends TSDeclareFunctionBase {
  /**
   * TS1040: 'async' modifier cannot be used in an ambient context.
   */
  async: false;
  declare: true;
  /**
   * TS1221: Generators are not allowed in an ambient context.
   */
  generator: false;
}
declare interface TSDeclareKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSDeclareKeyword;
}
declare interface TSEmptyBodyFunctionExpression extends FunctionBase {
  type: AST_NODE_TYPES.TSEmptyBodyFunctionExpression;
  body: null;
  id: null;
}
declare interface TSEnumBody extends BaseNode {
  type: AST_NODE_TYPES.TSEnumBody;
  members: TSEnumMember[];
}
declare interface TSEnumDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSEnumDeclaration;
  /**
   * The body of the enum.
   */
  body: TSEnumBody;
  /**
   * Whether this is a `const` enum.
   * @example
   * ```ts
   * const enum Foo {}
   * ```
   */
  const: boolean;
  /**
   * Whether this is a `declare`d enum.
   * @example
   * ```ts
   * declare enum Foo {}
   * ```
   */
  declare: boolean;
  /**
   * The enum name.
   */
  id: Identifier;
  /**
   * The enum members.
   * @deprecated Use {@link body} instead.
   */
  members: TSEnumMember[];
}
declare interface TSEnumMember extends BaseNode {
  type: AST_NODE_TYPES.TSEnumMember;
  id: Identifier | StringLiteral;
  initializer: Expression | undefined;
  /**
   * @deprecated the enum member is always non-computed.
   */
  computed: boolean;
}
declare interface TSExportAssignment extends BaseNode {
  type: AST_NODE_TYPES.TSExportAssignment;
  expression: Expression;
}
declare interface TSExportKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSExportKeyword;
}
declare interface TSExternalModuleReference extends BaseNode {
  type: AST_NODE_TYPES.TSExternalModuleReference;
  expression: StringLiteral;
}
declare interface TSFunctionSignatureBase extends BaseNode {
  params: Parameter[];
  returnType: TSTypeAnnotation | undefined;
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface TSFunctionType extends TSFunctionSignatureBase {
  type: AST_NODE_TYPES.TSFunctionType;
}
declare interface TSHeritageBase extends BaseNode {
  expression: Expression;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare type TSImportEqualsDeclaration = TSImportEqualsNamespaceDeclaration | TSImportEqualsRequireDeclaration;
declare interface TSImportEqualsDeclarationBase extends BaseNode {
  type: AST_NODE_TYPES.TSImportEqualsDeclaration;
  /**
   * The locally imported name.
   */
  id: Identifier;
  /**
   * The kind of the import. Always `'value'` unless `moduleReference` is a
   * `TSExternalModuleReference`.
   */
  importKind: ImportKind;
  /**
   * The value being aliased.
   * @example
   * ```ts
   * import F1 = A;
   * import F2 = A.B.C;
   * import F3 = require('mod');
   * ```
   */
  moduleReference: Identifier | TSExternalModuleReference | TSQualifiedName;
}
declare interface TSImportEqualsNamespaceDeclaration extends TSImportEqualsDeclarationBase {
  /**
   * The kind of the import.
   */
  importKind: 'value';
  /**
   * The value being aliased.
   * ```
   * import F1 = A;
   * import F2 = A.B.C;
   * ```
   */
  moduleReference: Identifier | TSQualifiedName;
}
declare interface TSImportEqualsRequireDeclaration extends TSImportEqualsDeclarationBase {
  /**
   * The kind of the import.
   */
  importKind: ImportKind;
  /**
   * The value being aliased.
   * ```
   * import F3 = require('mod');
   * ```
   */
  moduleReference: TSExternalModuleReference;
}
declare interface TSImportType extends BaseNode {
  type: AST_NODE_TYPES.TSImportType;
  /** @deprecated Use {@link `source`} instead. */
  argument: TypeNode;
  options: ObjectExpression | null;
  qualifier: EntityName | null;
  source: StringLiteral;
  typeArguments: TSTypeParameterInstantiation | null;
}
declare interface TSIndexedAccessType extends BaseNode {
  type: AST_NODE_TYPES.TSIndexedAccessType;
  indexType: TypeNode;
  objectType: TypeNode;
}
declare interface TSIndexSignature extends BaseNode {
  type: AST_NODE_TYPES.TSIndexSignature;
  accessibility: Accessibility | undefined;
  parameters: Parameter[];
  readonly: boolean;
  static: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare interface TSInferType extends BaseNode {
  type: AST_NODE_TYPES.TSInferType;
  typeParameter: TSTypeParameter;
}
declare interface TSInstantiationExpression extends BaseNode {
  type: AST_NODE_TYPES.TSInstantiationExpression;
  expression: Expression;
  typeArguments: TSTypeParameterInstantiation;
}
declare interface TSInterfaceBody extends BaseNode {
  type: AST_NODE_TYPES.TSInterfaceBody;
  body: TypeElement[];
}
declare interface TSInterfaceDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSInterfaceDeclaration;
  /**
   * The body of the interface
   */
  body: TSInterfaceBody;
  /**
   * Whether the interface was `declare`d
   */
  declare: boolean;
  /**
   * The types this interface `extends`
   */
  extends: TSInterfaceHeritage[];
  /**
   * The name of this interface
   */
  id: Identifier;
  /**
   * The generic type parameters declared for the interface. Empty declaration
   * (`<>`) is different from no declaration.
   */
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface TSInterfaceHeritage extends TSHeritageBase {
  type: AST_NODE_TYPES.TSInterfaceHeritage;
}
declare interface TSIntersectionType extends BaseNode {
  type: AST_NODE_TYPES.TSIntersectionType;
  types: TypeNode[];
}
declare interface TSIntrinsicKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSIntrinsicKeyword;
}
declare interface TSLiteralType extends BaseNode {
  type: AST_NODE_TYPES.TSLiteralType;
  literal: Exclude<LiteralExpression, NullLiteral | RegExpLiteral> | UnaryExpressionMinus | UnaryExpressionPlus;
}
declare interface TSMappedType extends BaseNode {
  type: AST_NODE_TYPES.TSMappedType;
  constraint: TypeNode;
  key: Identifier;
  nameType: TypeNode | null;
  optional: boolean | '+' | '-' | undefined;
  readonly: boolean | '+' | '-' | undefined;
  typeAnnotation: TypeNode | undefined;
  /** @deprecated Use {@link `constraint`} and {@link `key`} instead. */
  typeParameter: TSTypeParameter;
}
declare type TSMethodSignature = TSMethodSignatureComputedName | TSMethodSignatureNonComputedName;
declare interface TSMethodSignatureBase extends BaseNode {
  type: AST_NODE_TYPES.TSMethodSignature;
  accessibility: Accessibility | undefined;
  computed: boolean;
  key: PropertyName;
  kind: 'get' | 'method' | 'set';
  optional: boolean;
  params: Parameter[];
  readonly: boolean;
  returnType: TSTypeAnnotation | undefined;
  static: boolean;
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface TSMethodSignatureComputedName extends TSMethodSignatureBase {
  computed: true;
  key: PropertyNameComputed;
}
declare interface TSMethodSignatureNonComputedName extends TSMethodSignatureBase {
  computed: false;
  key: PropertyNameNonComputed;
}
declare interface TSModuleBlock extends BaseNode {
  type: AST_NODE_TYPES.TSModuleBlock;
  body: ProgramStatement[];
}
declare type TSModuleDeclaration = TSModuleDeclarationGlobal | TSModuleDeclarationModule | TSModuleDeclarationNamespace;
declare interface TSModuleDeclarationBase extends BaseNode {
  type: AST_NODE_TYPES.TSModuleDeclaration;
  /**
   * The body of the module.
   * This can only be `undefined` for the code `declare module 'mod';`
   */
  body?: TSModuleBlock;
  /**
   * Whether the module is `declare`d
   * @example
   * ```ts
   * declare namespace F {}
   * ```
   */
  declare: boolean;
  /**
   * Whether this is a global declaration
   * @example
   * ```ts
   * declare global {}
   * ```
   *
   * @deprecated Use {@link kind} instead
   */
  global: boolean;
  /**
   * The name of the module
   * ```
   * namespace A {}
   * namespace A.B.C {}
   * module 'a' {}
   * ```
   */
  id: Identifier | Literal | TSQualifiedName;
  /**
   * The keyword used to define this module declaration
   * @example
   * ```ts
   * namespace Foo {}
   * ^^^^^^^^^
   *
   * module 'foo' {}
   * ^^^^^^
   *
   * global {}
   * ^^^^^^
   * ```
   */
  kind: TSModuleDeclarationKind;
}
declare interface TSModuleDeclarationGlobal extends TSModuleDeclarationBase {
  body: TSModuleBlock;
  /**
   * This will always be an Identifier with name `global`
   */
  id: Identifier;
  kind: 'global';
}
declare type TSModuleDeclarationKind = 'global' | 'module' | 'namespace';
declare type TSModuleDeclarationModule = TSModuleDeclarationModuleWithIdentifierId | TSModuleDeclarationModuleWithStringId;
declare interface TSModuleDeclarationModuleBase extends TSModuleDeclarationBase {
  kind: 'module';
}
/**
 * The legacy module declaration, replaced with namespace declarations.
 * ```
 * module A {}
 * ```
 */
declare interface TSModuleDeclarationModuleWithIdentifierId extends TSModuleDeclarationModuleBase {
  body: TSModuleBlock;
  id: Identifier;
  kind: 'module';
}
declare type TSModuleDeclarationModuleWithStringId = TSModuleDeclarationModuleWithStringIdDeclared | TSModuleDeclarationModuleWithStringIdNotDeclared;
/**
 * A string module declaration that is declared:
 * ```
 * declare module 'foo' {}
 * declare module 'foo';
 * ```
 */
declare interface TSModuleDeclarationModuleWithStringIdDeclared extends TSModuleDeclarationModuleBase {
  body?: TSModuleBlock;
  declare: true;
  id: StringLiteral;
  kind: 'module';
}
/**
 * A string module declaration that is not declared:
 * ```
 * module 'foo' {}
 * ```
 */
declare interface TSModuleDeclarationModuleWithStringIdNotDeclared extends TSModuleDeclarationModuleBase {
  body: TSModuleBlock;
  declare: false;
  id: StringLiteral;
  kind: 'module';
}
declare interface TSModuleDeclarationNamespace extends TSModuleDeclarationBase {
  body: TSModuleBlock;
  id: Identifier | TSQualifiedName;
  kind: 'namespace';
}
declare interface TSNamedTupleMember extends BaseNode {
  type: AST_NODE_TYPES.TSNamedTupleMember;
  elementType: TypeNode;
  label: Identifier;
  optional: boolean;
}
/**
 * For the following declaration:
 * ```
 * export as namespace X;
 * ```
 */
declare interface TSNamespaceExportDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSNamespaceExportDeclaration;
  /**
   * The name of the global variable that's exported as namespace
   */
  id: Identifier;
}
declare interface TSNeverKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSNeverKeyword;
}
declare interface TSNonNullExpression extends BaseNode {
  type: AST_NODE_TYPES.TSNonNullExpression;
  expression: Expression;
}
declare interface TSNullKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSNullKeyword;
}
declare interface TSNumberKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSNumberKeyword;
}
declare interface TSObjectKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSObjectKeyword;
}
declare interface TSOptionalType extends BaseNode {
  type: AST_NODE_TYPES.TSOptionalType;
  typeAnnotation: TypeNode;
}
declare interface TSParameterProperty extends BaseNode {
  type: AST_NODE_TYPES.TSParameterProperty;
  accessibility: Accessibility | undefined;
  decorators: Decorator[];
  override: boolean;
  parameter: ParameterPropertyParameter;
  readonly: boolean;
  static: boolean;
}
declare interface TSPrivateKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSPrivateKeyword;
}
declare type TSPropertySignature = TSPropertySignatureComputedName | TSPropertySignatureNonComputedName;
declare interface TSPropertySignatureBase extends BaseNode {
  type: AST_NODE_TYPES.TSPropertySignature;
  accessibility: Accessibility | undefined;
  computed: boolean;
  key: PropertyName;
  optional: boolean;
  readonly: boolean;
  static: boolean;
  typeAnnotation: TSTypeAnnotation | undefined;
}
declare interface TSPropertySignatureComputedName extends TSPropertySignatureBase {
  computed: true;
  key: PropertyNameComputed;
}
declare interface TSPropertySignatureNonComputedName extends TSPropertySignatureBase {
  computed: false;
  key: PropertyNameNonComputed;
}
declare interface TSProtectedKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSProtectedKeyword;
}
declare interface TSPublicKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSPublicKeyword;
}
declare interface TSQualifiedName extends BaseNode {
  type: AST_NODE_TYPES.TSQualifiedName;
  left: EntityName;
  right: Identifier;
}
declare interface TSReadonlyKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSReadonlyKeyword;
}
declare interface TSRestType extends BaseNode {
  type: AST_NODE_TYPES.TSRestType;
  typeAnnotation: TypeNode;
}
declare interface TSSatisfiesExpression extends BaseNode {
  type: AST_NODE_TYPES.TSSatisfiesExpression;
  expression: Expression;
  typeAnnotation: TypeNode;
}
declare interface TSStaticKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSStaticKeyword;
}
declare interface TSStringKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSStringKeyword;
}
declare interface TSSymbolKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSSymbolKeyword;
}
declare interface TSTemplateLiteralType extends BaseNode {
  type: AST_NODE_TYPES.TSTemplateLiteralType;
  quasis: TemplateElement[];
  types: TypeNode[];
}
declare interface TSThisType extends BaseNode {
  type: AST_NODE_TYPES.TSThisType;
}
declare interface TSTupleType extends BaseNode {
  type: AST_NODE_TYPES.TSTupleType;
  elementTypes: TypeNode[];
}
declare interface TSTypeAliasDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSTypeAliasDeclaration;
  /**
   * Whether the type was `declare`d.
   * @example
   * ```ts
   * declare type T = 1;
   * ```
   */
  declare: boolean;
  /**
   * The name of the type.
   */
  id: Identifier;
  /**
   * The "value" (type) of the declaration
   */
  typeAnnotation: TypeNode;
  /**
   * The generic type parameters declared for the type. Empty declaration
   * (`<>`) is different from no declaration.
   */
  typeParameters: TSTypeParameterDeclaration | undefined;
}
declare interface TSTypeAnnotation extends BaseNode {
  type: AST_NODE_TYPES.TSTypeAnnotation;
  typeAnnotation: TypeNode;
}
declare interface TSTypeAssertion extends BaseNode {
  type: AST_NODE_TYPES.TSTypeAssertion;
  expression: Expression;
  typeAnnotation: TypeNode;
}
declare interface TSTypeLiteral extends BaseNode {
  type: AST_NODE_TYPES.TSTypeLiteral;
  members: TypeElement[];
}
declare interface TSTypeOperator extends BaseNode {
  type: AST_NODE_TYPES.TSTypeOperator;
  operator: 'keyof' | 'readonly' | 'unique';
  typeAnnotation: TypeNode | undefined;
}
declare interface TSTypeParameter extends BaseNode {
  type: AST_NODE_TYPES.TSTypeParameter;
  const: boolean;
  constraint: TypeNode | undefined;
  default: TypeNode | undefined;
  in: boolean;
  name: Identifier;
  out: boolean;
}
declare interface TSTypeParameterDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSTypeParameterDeclaration;
  params: TSTypeParameter[];
}
declare interface TSTypeParameterInstantiation extends BaseNode {
  type: AST_NODE_TYPES.TSTypeParameterInstantiation;
  params: TypeNode[];
}
declare interface TSTypePredicate extends BaseNode {
  type: AST_NODE_TYPES.TSTypePredicate;
  asserts: boolean;
  parameterName: Identifier | TSThisType;
  typeAnnotation: TSTypeAnnotation | null;
}
declare interface TSTypeQuery extends BaseNode {
  type: AST_NODE_TYPES.TSTypeQuery;
  exprName: EntityName | TSImportType;
  typeArguments: TSTypeParameterInstantiation | undefined;
}
declare interface TSTypeReference extends BaseNode {
  type: AST_NODE_TYPES.TSTypeReference;
  typeArguments: TSTypeParameterInstantiation | undefined;
  typeName: EntityName;
}
declare interface TSUndefinedKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSUndefinedKeyword;
}
declare interface TSUnionType extends BaseNode {
  type: AST_NODE_TYPES.TSUnionType;
  types: TypeNode[];
}
declare interface TSUnknownKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSUnknownKeyword;
}
declare interface TSVoidKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSVoidKeyword;
}
declare type TypeElement = TSCallSignatureDeclaration | TSConstructSignatureDeclaration | TSIndexSignature | TSMethodSignature | TSPropertySignature;
declare type TypeNode = TSAbstractKeyword | TSAnyKeyword | TSArrayType | TSAsyncKeyword | TSBigIntKeyword | TSBooleanKeyword | TSConditionalType | TSConstructorType | TSDeclareKeyword | TSExportKeyword | TSFunctionType | TSImportType | TSIndexedAccessType | TSInferType | TSIntersectionType | TSIntrinsicKeyword | TSLiteralType | TSMappedType | TSNamedTupleMember | TSNeverKeyword | TSNullKeyword | TSNumberKeyword | TSObjectKeyword | TSOptionalType | TSPrivateKeyword | TSProtectedKeyword | TSPublicKeyword | TSQualifiedName | TSReadonlyKeyword | TSRestType | TSStaticKeyword | TSStringKeyword | TSSymbolKeyword | TSTemplateLiteralType | TSThisType | TSTupleType | TSTypeLiteral | TSTypeOperator | TSTypePredicate | TSTypeQuery | TSTypeReference | TSUndefinedKeyword | TSUnionType | TSUnknownKeyword | TSVoidKeyword;
declare type UnaryExpression = UnaryExpressionBitwiseNot | UnaryExpressionDelete | UnaryExpressionMinus | UnaryExpressionNot | UnaryExpressionPlus | UnaryExpressionTypeof | UnaryExpressionVoid;
declare interface UnaryExpressionBase extends BaseNode {
  argument: Expression;
  operator: string;
  prefix: boolean;
}
declare type UnaryExpressionBitwiseNot = UnaryExpressionSpecific<'~'>;
declare type UnaryExpressionDelete = UnaryExpressionSpecific<'delete'>;
declare type UnaryExpressionMinus = UnaryExpressionSpecific<'-'>;
declare type UnaryExpressionNot = UnaryExpressionSpecific<'!'>;
declare type UnaryExpressionPlus = UnaryExpressionSpecific<'+'>;
declare interface UnaryExpressionSpecific<T extends string> extends UnaryExpressionBase {
  type: AST_NODE_TYPES.UnaryExpression;
  operator: T;
}
declare type UnaryExpressionTypeof = UnaryExpressionSpecific<'typeof'>;
declare type UnaryExpressionVoid = UnaryExpressionSpecific<'void'>;
declare interface UpdateExpression extends UnaryExpressionBase {
  type: AST_NODE_TYPES.UpdateExpression;
  operator: '++' | '--';
}
declare type UsingDeclaration = UsingInForOfDeclaration | UsingInNormalContextDeclaration;
declare interface UsingDeclarationBase extends BaseNode {
  type: AST_NODE_TYPES.VariableDeclaration;
  /**
   * This value will always be `false`
   * because 'declare' modifier cannot appear on a 'using' declaration.
   */
  declare: false;
  /**
   * The keyword used to declare the variable(s)
   * @example
   * ```ts
   * using x = 1;
   * await using y = 2;
   * ```
   */
  kind: 'await using' | 'using';
}
declare type UsingDeclarator = UsingInForOfDeclarator | UsingInNormalContextDeclarator;
declare interface UsingInForOfDeclaration extends UsingDeclarationBase {
  /**
   * The variables declared by this declaration.
   * Always has exactly one element.
   * @example
   * ```ts
   * for (using x of y) {}
   * ```
   */
  declarations: [UsingInForOfDeclarator];
}
declare interface UsingInForOfDeclarator extends VariableDeclaratorBase {
  definite: false;
  id: Identifier;
  init: null;
}
declare interface UsingInNormalContextDeclaration extends UsingDeclarationBase {
  /**
   * The variables declared by this declaration.
   * Always non-empty.
   * @example
   * ```ts
   * using x = 1;
   * using y = 1, z = 2;
   * ```
   */
  declarations: UsingInNormalContextDeclarator[];
}
declare interface UsingInNormalContextDeclarator extends VariableDeclaratorBase {
  definite: false;
  id: Identifier;
  init: Expression;
}
declare type ValueOf<T> = T[keyof T];
declare type VariableDeclaration = LetOrConstOrVarDeclaration | UsingDeclaration;
declare type VariableDeclarator = LetOrConstOrVarDeclarator | UsingDeclarator;
declare interface VariableDeclaratorBase extends BaseNode {
  type: AST_NODE_TYPES.VariableDeclarator;
  /**
   * Whether there's definite assignment assertion (`let x!: number`).
   * If `true`, then: `id` must be an identifier with a type annotation,
   * `init` must be `null`, and the declarator must be a `var`/`let` declarator.
   */
  definite: boolean;
  /**
   * The name(s) of the variable(s).
   */
  id: BindingName;
  /**
   * The initializer expression of the variable. Must be present for `const` unless
   * in a `declare const`.
   */
  init: Expression | null;
}
declare interface VariableDeclaratorDefiniteAssignment extends VariableDeclaratorBase {
  definite: true;
  /**
   * The name of the variable. Must have a type annotation.
   */
  id: Identifier;
  init: null;
}
declare interface VariableDeclaratorMaybeInit extends VariableDeclaratorBase {
  definite: false;
}
declare interface VariableDeclaratorNoInit extends VariableDeclaratorBase {
  definite: false;
  init: null;
}
declare interface WhileStatement extends BaseNode {
  type: AST_NODE_TYPES.WhileStatement;
  body: Statement;
  test: Expression;
}
declare interface WithStatement extends BaseNode {
  type: AST_NODE_TYPES.WithStatement;
  body: Statement;
  object: Expression;
}
declare interface YieldExpression extends BaseNode {
  type: AST_NODE_TYPES.YieldExpression;
  argument: Expression | null;
  delegate: boolean;
}
//#endregion
//#region ../../node_modules/.pnpm/@typescript-eslint+types@8.59.3/node_modules/@typescript-eslint/types/dist/ts-estree.d.ts
declare module './generated/ast-spec' {
  interface BaseNode {
    parent: Node;
  }
  interface Program {
    /**
     * @remarks This never-used property exists only as a convenience for code that tries to access node parents repeatedly.
     */
    parent?: never;
  }
  interface AccessorPropertyComputedName {
    parent: ClassBody;
  }
  interface AccessorPropertyNonComputedName {
    parent: ClassBody;
  }
  interface TSAbstractAccessorPropertyComputedName {
    parent: ClassBody;
  }
  interface TSAbstractAccessorPropertyNonComputedName {
    parent: ClassBody;
  }
  interface VariableDeclaratorDefiniteAssignment {
    parent: VariableDeclaration;
  }
  interface VariableDeclaratorMaybeInit {
    parent: VariableDeclaration;
  }
  interface VariableDeclaratorNoInit {
    parent: VariableDeclaration;
  }
  interface UsingInForOfDeclarator {
    parent: VariableDeclaration;
  }
  interface UsingInNormalContextDeclarator {
    parent: VariableDeclaration;
  }
  interface CatchClause {
    parent: TryStatement;
  }
  interface ClassBody {
    parent: ClassDeclaration | ClassExpression;
  }
  interface ImportAttribute {
    parent: ExportAllDeclaration | ExportNamedDeclaration | ImportDeclaration | TSImportType;
  }
  interface ImportDefaultSpecifier {
    parent: ImportDeclaration;
  }
  interface ImportNamespaceSpecifier {
    parent: ImportDeclaration;
  }
  interface ImportSpecifier {
    parent: ExportAllDeclaration | ExportNamedDeclaration | ImportDeclaration;
  }
  interface ExportDefaultDeclaration {
    parent: BlockStatement | Program | TSModuleBlock;
  }
  interface ExportNamedDeclarationWithoutSourceWithMultiple {
    parent: BlockStatement | Program | TSModuleBlock;
  }
  interface ExportNamedDeclarationWithoutSourceWithSingle {
    parent: BlockStatement | Program | TSModuleBlock;
  }
  interface ExportNamedDeclarationWithSource {
    parent: BlockStatement | Program | TSModuleBlock;
  }
  interface FunctionDeclarationWithName {
    parent: BlockStatement | ExportDefaultDeclaration | ExportNamedDeclaration | Program;
  }
  interface FunctionDeclarationWithOptionalName {
    parent: ExportDefaultDeclaration;
  }
  interface JSXAttribute {
    parent: JSXOpeningElement;
  }
  interface JSXClosingElement {
    parent: JSXElement;
  }
  interface JSXClosingFragment {
    parent: JSXFragment;
  }
  interface JSXOpeningElement {
    parent: JSXElement;
  }
  interface JSXOpeningFragment {
    parent: JSXFragment;
  }
  interface JSXSpreadAttribute {
    parent: JSXOpeningElement;
  }
  interface MethodDefinitionComputedName {
    parent: ClassBody;
  }
  interface MethodDefinitionNonComputedName {
    parent: ClassBody;
  }
  interface TSAbstractMethodDefinitionComputedName {
    parent: ClassBody;
  }
  interface TSAbstractMethodDefinitionNonComputedName {
    parent: ClassBody;
  }
  interface PropertyComputedName {
    parent: ObjectExpression | ObjectPattern;
  }
  interface PropertyNonComputedName {
    parent: ObjectExpression | ObjectPattern;
  }
  interface PropertyDefinitionComputedName {
    parent: ClassBody;
  }
  interface PropertyDefinitionNonComputedName {
    parent: ClassBody;
  }
  interface TSAbstractPropertyDefinitionComputedName {
    parent: ClassBody;
  }
  interface TSAbstractPropertyDefinitionNonComputedName {
    parent: ClassBody;
  }
  interface SpreadElement {
    parent: ArrayExpression | CallExpression | NewExpression | ObjectExpression;
  }
  interface StaticBlock {
    parent: ClassBody;
  }
  interface SwitchCase {
    parent: SwitchStatement;
  }
  interface TemplateElement {
    parent: TemplateLiteral | TSTemplateLiteralType;
  }
  interface TSCallSignatureDeclaration {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSConstructSignatureDeclaration {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSClassImplements {
    parent: ClassDeclaration | ClassExpression;
  }
  interface TSEnumBody {
    parent: TSEnumDeclaration;
  }
  interface TSEnumMember {
    parent: TSEnumBody;
  }
  interface TSIndexSignature {
    parent: ClassBody | TSInterfaceBody | TSTypeLiteral;
  }
  interface TSInterfaceBody {
    parent: TSInterfaceDeclaration;
  }
  interface TSInterfaceHeritage {
    parent: TSInterfaceBody;
  }
  interface TSMethodSignatureComputedName {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSMethodSignatureNonComputedName {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSModuleBlock {
    parent: TSModuleDeclaration;
  }
  interface TSParameterProperty {
    parent: FunctionLike;
  }
  interface TSPropertySignatureComputedName {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSPropertySignatureNonComputedName {
    parent: TSInterfaceBody | TSTypeLiteral;
  }
  interface TSTypeParameter {
    parent: TSInferType | TSMappedType | TSTypeParameterDeclaration;
  }
  interface ExportSpecifierWithIdentifierLocal {
    parent: ExportNamedDeclaration;
  }
  interface ExportSpecifierWithStringOrLiteralLocal {
    parent: ExportNamedDeclaration;
  }
}
//#endregion
//#region ../core/dist/index.d.ts
//#region src/types/config.d.ts
type FailOnLevel = "error" | "warning" | "none";
interface ReactDoctorIgnoreOverride {
  /** Glob patterns the override applies to (e.g. `["src/legacy/**"]`). */
  files: string[];
  /**
   * Rule keys to suppress for the matched files. Omit (or leave empty) to
   * suppress every rule for those files.
   */
  rules?: string[];
}
interface ReactDoctorIgnoreConfig {
  /**
   * Fully-qualified rule keys (`"<plugin>/<rule>"`) whose diagnostics are
   * dropped AFTER linting. The rule still runs; its findings are filtered
   * out. To stop a rule from running at all, set it to `"off"` in the
   * top-level `rules` map instead. Prefer `react-doctor rules disable
   * <rule>` to edit this safely.
   */
  rules?: string[];
  /**
   * Glob patterns whose files are excluded from scanning entirely (matched
   * against paths relative to the scanned directory).
   */
  files?: string[];
  /** Per-path rule suppressions — narrower than the top-level `rules`/`files`. */
  overrides?: ReactDoctorIgnoreOverride[];
  /**
   * Behavioral tags whose rules are disabled BEFORE linting, skipping a
   * whole family at once (e.g. `["design", "test-noise", "migration-hint"]`).
   * Prefer `react-doctor rules ignore-tag <tag>` to edit this safely.
   */
  tags?: string[];
}
/**
 * Discrete output channels a diagnostic can flow through after a scan.
 * Each surface is filtered independently so a rule can be visible
 * locally but excluded from PR comments, the score, or the CI gate:
 *
 * - `cli` — local terminal output from `react-doctor` (`printDiagnostics`).
 * - `prComment` — diagnostics destined for a sticky pull-request
 *   summary comment. Selected by running the CLI with `--pr-comment`
 *   (sets `outputSurface: "prComment"`).
 * - `score` — diagnostics shipped to the React Doctor score API
 *   (or counted toward local score calculations).
 * - `ciFailure` — diagnostics that count toward the `--fail-on` exit
 *   code gate. A diagnostic excluded from this surface never fails the
 *   build, regardless of severity.
 *
 * Defaults: design rules (tag `"design"`) are excluded from `prComment`,
 * `score`, and `ciFailure` so style cleanup doesn't dilute meaningful
 * React findings. They remain in `cli` so locally-running developers
 * still see the suggestion when they touch the file.
 */
type DiagnosticSurface = "cli" | "prComment" | "score" | "ciFailure";
/**
 * Severity value accepted by the top-level `rules` and `categories`
 * config fields. Exactly the same form ESLint and oxlint accept:
 * `"off"` skips registration entirely (the rule never runs and
 * never enters any surface); `"error"` / `"warn"` change the rule's
 * registered severity.
 *
 * For visibility-only adjustments (silence on PR comments but keep
 * on CLI / score), prefer `surfaces` instead — severity applies
 * before lint runs and is the most aggressive control.
 */
type RuleSeverityOverride = "error" | "warn" | "off";
/**
 * Internal shape consumed by `resolveRuleSeverityOverride` and
 * `buildDiagnosticPipeline`. Assembled at runtime from the top-level
 * `rules` and `categories` fields on `ReactDoctorConfig`. Per-rule
 * wins over per-category when both match the same diagnostic.
 */
/**
 * Closed set of severity buckets. Spelled out (rather than
 * `Record<string, …>`) so an unknown/typo'd bucket key is a type error
 * instead of a silent no-op.
 */
interface SeverityBuckets {
  "compiler-cleanup"?: RuleSeverityOverride;
}
interface SurfaceControls {
  /**
   * Tag names whose diagnostics should be force-included on the surface,
   * even if a default or category-level exclusion would otherwise drop
   * them. Include wins over exclude when both apply to the same rule.
   */
  includeTags?: string[];
  /**
   * Tag names whose diagnostics should be excluded from the surface.
   * Use this to silence whole rule families (e.g. `["design"]`,
   * `["test-noise"]`) for a single channel without touching others.
   */
  excludeTags?: string[];
  /** Category names (e.g. `"Maintainability"`) to force-include. */
  includeCategories?: string[];
  /** Category names (e.g. `"Maintainability"`) to exclude. */
  excludeCategories?: string[];
  /**
   * Fully-qualified rule keys (`"<plugin>/<rule>"`, e.g.
   * `"react-doctor/design-no-redundant-size-axes"`) to force-include.
   */
  includeRules?: string[];
  /** Fully-qualified rule keys to exclude from this surface. */
  excludeRules?: string[];
}
interface ReactDoctorConfig {
  $schema?: string;
  ignore?: ReactDoctorIgnoreConfig;
  lint?: boolean;
  /**
   * Whether to run dead-code analysis (via `deslop-js`) alongside lint.
   * Reports unused files, unused exports, unused dependencies, and
   * circular imports under the "Maintainability" category. Default: `true`.
   * Always skipped in `--diff` / `--staged` modes because reachability
   * is a whole-project property.
   */
  deadCode?: boolean;
  verbose?: boolean;
  /**
   * Whether to surface `"warning"`-severity diagnostics. Default: `true`
   * — every warning reaches every surface (CLI, PR comment, score,
   * `--fail-on`).
   *
   * Set to `false` to surface only `"error"`-severity findings. This is the
   * master toggle and runs after per-rule / per-category severity
   * overrides: a rule the user explicitly restamps to `"warn"` (via
   * `rules` / `categories`) still shows even when `warnings` is `false`.
   */
  warnings?: boolean;
  /**
   * Scope scans to changed files. `true` diffs against the default branch
   * (`main`/`master`); a string pins an explicit base ref (e.g. `"develop"`)
   * or commit range (`"main..HEAD"`). The reserved value `"parent"`
   * auto-detects the branch the current branch forked from (nearest
   * merge-base) — handy for stacked branches — and falls back to the
   * default branch when none is found. Equivalent to the `--diff` flag;
   * `--full` (or `--diff false`) overrides it.
   */
  diff?: boolean | string;
  failOn?: FailOnLevel;
  customRulesOnly?: boolean;
  share?: boolean;
  noScore?: boolean;
  /**
   * Redirect react-doctor at a different project directory than the one
   * it was invoked against. Resolved relative to the location of the
   * config file that declared this field (NOT relative to the CWD), so
   * the redirect is stable no matter where the CLI / `diagnose()` is
   * run from. Absolute paths are used as-is.
   *
   * Typical use: a monorepo root holds the only `doctor.config.*`
   * (so editor tooling and child commands all find it), but the React
   * app lives in `apps/web`. Setting `"rootDir": "apps/web"` makes
   * every invocation that loads this config scan that subproject
   * without anyone needing to `cd` first or pass an explicit path.
   *
   * Ignored if the resolved path does not exist or is not a directory
   * (a warning is emitted and react-doctor falls back to the originally
   * requested directory).
   */
  rootDir?: string;
  textComponents?: string[];
  /**
   * Names of components that safely route string-only children through a
   * React Native `<Text>` internally (e.g. `heroui-native`'s `Button`,
   * which stringifies its children and renders them through a
   * `ButtonLabel` → `Text`). For listed components, `rn-no-raw-text`
   * is suppressed ONLY when the wrapper's children are entirely
   * stringifiable (no nested JSX elements). A wrapper with mixed
   * children — e.g. `<Button>Save<Icon /></Button>` — still reports,
   * because the wrapper can't safely route raw text alongside a
   * sibling JSX element.
   *
   * Use this instead of `textComponents` when the component is not
   * itself a text element but is known to wrap its string children
   * in one. `textComponents` is the broader escape hatch and
   * suppresses regardless of sibling content.
   */
  rawTextWrapperComponents?: string[];
  /**
   * Project-level allowlist of function names that the
   * `server-auth-actions` rule treats as an auth check at the top of
   * a server action. Names are accepted whether called as a bare
   * identifier (`myAuthGuard()`) or as the final property of a
   * member call (`ctx.myAuthGuard()`); unlike the built-in default
   * list, user-provided names are treated as distinctive and never
   * subject to receiver-object disambiguation.
   *
   * Use this to teach react-doctor about custom auth guards in
   * codebases that wrap their auth library — e.g. a project-local
   * `requireWorkspaceMember` or `ensureSignedIn`.
   */
  serverAuthFunctionNames?: string[];
  /**
   * Whether to respect inline `// eslint-disable*`, `// oxlint-disable*`,
   * and `// react-doctor-disable*` comments in source files. Default: `true`.
   *
   * File-level ignores (`.gitignore`, `.eslintignore`, `.oxlintignore`,
   * `.prettierignore`, `.gitattributes` `linguist-vendored` /
   * `linguist-generated`) are ALWAYS honored regardless of this option
   * — they typically point at vendored or generated code that
   * genuinely shouldn't be linted at all.
   *
   * Set to `false` for "audit mode": every inline suppression is
   * neutralized so react-doctor reports every diagnostic regardless
   * of historical hide-comments.
   */
  respectInlineDisables?: boolean;
  /**
   * Whether to merge the user's existing JSON oxlint / eslint config
   * (`.oxlintrc.json` or `.eslintrc.json`) into the generated scan via
   * oxlint's `extends` field, so diagnostics from those rules count
   * toward the react-doctor score. Default: `true`.
   *
   * Detection runs at the scanned directory and walks up to the
   * nearest project boundary (`.git` directory or monorepo root).
   * The first match wins, with `.oxlintrc.json` preferred over
   * `.eslintrc.json`.
   *
   * Only JSON-format configs are supported because oxlint's `extends`
   * cannot evaluate JS/TS configs. Flat configs (`eslint.config.js`),
   * legacy JS configs (`.eslintrc.js`), and TypeScript oxlint configs
   * (`oxlint.config.ts`) are silently skipped.
   *
   * Category-level enables in the user's config (`"categories": { ... }`)
   * are NOT honored — react-doctor explicitly disables every oxlint
   * category to keep the scan scoped to its curated rule surface, and
   * local config wins over `extends`. Use rule-level severities to
   * fold rules into the score.
   *
   * Set to `false` to scan only react-doctor's curated rule set.
   */
  adoptExistingLintConfig?: boolean;
  /**
   * Per-surface include/exclude controls. Each `DiagnosticSurface` is
   * resolved independently against rule tags, category, and id so a
   * single rule can be visible locally yet hidden from PR comments,
   * neutralized from the score, and excluded from `--fail-on` — all
   * without touching the rule's severity or activation.
   *
   * Defaults (applied before user overrides):
   *
   * - `prComment` excludes tag `"design"`
   * - `score` excludes tag `"design"`
   * - `ciFailure` excludes tag `"design"`
   *
   * Pass any controls block (even an empty `{}`) to keep the default
   * exclusions; the user's include/exclude entries layer on top.
   * Include entries always win over exclude entries — handy for
   * promoting a single high-signal `design-*` rule back into the
   * score or PR-comment surface.
   */
  surfaces?: Partial<Record<DiagnosticSurface, SurfaceControls>>;
  /**
   * Per-rule severity map — the exact ESLint / oxlint top-level
   * `rules` field. Keys are fully-qualified rule keys
   * (`"<plugin>/<rule>"`, e.g. `"react-doctor/no-array-index-as-key"`),
   * values are `"error" | "warn" | "off"`.
   *
   * `"off"` skips registration in the generated lint config so the
   * rule never runs; `"error"` / `"warn"` re-stamp the registered
   * severity and the post-lint diagnostic, so downstream consumers
   * (`--fail-on`, the score, the printed list) all see the
   * user-chosen severity.
   *
   * For visibility-only changes (silence on PR comments but keep on
   * CLI / score), prefer `surfaces` instead. Most specific control
   * wins: `rules` > `categories` > `tags`.
   *
   * ```json
   * { "rules": { "react-doctor/no-array-index-as-key": "error" } }
   * ```
   */
  rules?: Record<string, RuleSeverityOverride>;
  /**
   * Per-category severity map. Mirrors oxlint's top-level
   * `categories` field, but keyed by React Doctor's five user-facing
   * buckets: `"Security"`, `"Bugs"`, `"Performance"`,
   * `"Accessibility"`, `"Maintainability"`.
   *
   * ```json
   * { "categories": { "Maintainability": "off", "Performance": "warn" } }
   * ```
   *
   * To silence a whole tag-defined rule family (e.g. `"design"`,
   * `"test-noise"`, `"migration-hint"`) that doesn't align with a
   * single category, use `ignore.tags` instead.
   */
  categories?: Record<string, RuleSeverityOverride>;
  /**
   * Per-bucket severity map. Buckets are curated rule families with a
   * shared gating story (not categories). Today the only bucket is
   * `"compiler-cleanup"`: the redundant-memoization rule
   * (`react-compiler-no-manual-memoization`) that ships as a warning once
   * React Compiler is detected. Set it to `"error"` to re-enable strictness.
   *
   * ```json
   * { "buckets": { "compiler-cleanup": "error" } }
   * ```
   *
   * A per-rule override in `rules` still wins over a bucket entry.
   */
  buckets?: SeverityBuckets;
  /**
   * User-defined oxlint plugins to load alongside the built-in
   * `react-doctor` plugin. Each entry is either:
   *
   * - A **relative path** to a JS / TS file (resolved relative to
   *   the directory of the config file that declared it — NOT the
   *   CWD), e.g. `"./lint/my-rules.js"`.
   * - An **npm package name**, e.g. `"react-doctor-plugin-team-conventions"`.
   *
   * The module must default-export an oxlint-shaped plugin:
   * `{ meta: { name: string }, rules: Record<string, HostRule> }`.
   * Use `defineRule` from `oxlint-plugin-react-doctor` for the
   * cleanest authoring shape — see CONTRIBUTING.md → "Writing a
   * custom plugin" for the full template.
   *
   * Rules from a user plugin are **opt-in by default**: a rule
   * doesn't run unless `rules: { "<plugin-name>/<rule>": "warn" | "error" }`
   * explicitly enables it. (Mirrors how `defaultEnabled: false`
   * rules behave in the built-in plugin.) Once enabled, the rule
   * flows through every react-doctor surface (CLI / PR comment /
   * score / CI gate) the same as a built-in rule.
   *
   * ```json
   * {
   *   "plugins": [
   *     "./lint/my-team-rules.js",
   *     "react-doctor-plugin-shopify-conventions"
   *   ],
   *   "rules": {
   *     "my-team-rules/no-bare-fetch": "error",
   *     "shopify-conventions/use-polaris-tokens": "warn"
   *   }
   * }
   * ```
   */
  plugins?: string[];
} //#endregion
//#region src/types/diagnostic.d.ts
interface Diagnostic {
  filePath: string;
  plugin: string;
  rule: string;
  severity: "error" | "warning";
  title?: string;
  message: string;
  help: string;
  url?: string;
  line: number;
  column: number;
  category: string;
  suppressionHint?: string;
}
//#endregion
//#region src/types/project-info.d.ts
type Framework = "nextjs" | "vite" | "cra" | "remix" | "gatsby" | "expo" | "react-native" | "tanstack-start" | "preact" | "unknown";
interface ProjectInfo {
  rootDirectory: string;
  projectName: string;
  reactVersion: string | null;
  reactMajorVersion: number | null;
  tailwindVersion: string | null;
  zodVersion: string | null;
  /** Parsed major from `zodVersion`, or `null` when absent/unparseable. Mirrors `reactMajorVersion`. */
  zodMajorVersion: number | null;
  framework: Framework;
  hasTypeScript: boolean;
  hasReactCompiler: boolean;
  hasTanStackQuery: boolean;
  /**
   * The declared `preact` version spec, or `null` when Preact isn't a
   * dependency. Parallels `reactVersion` so a React-compatible runtime is
   * modeled the same way React is. Drives the `preact` capability in
   * `buildCapabilities` (which gates every `preact-*` rule) — keyed off
   * this rather than `framework` because the dominant Preact setup
   * (Preact-on-Vite) classifies as `framework: "vite"` but still needs
   * Preact rules to fire.
   */
  preactVersion: string | null;
  /** Parsed major from `preactVersion`, or `null` when absent/unparseable. Mirrors `reactMajorVersion`. */
  preactMajorVersion: number | null;
  /**
   * `true` when the project (or any of its workspace packages) declares
   * React Native or Expo as a dependency. Enables the `react-native`
   * capability — and therefore every `rn-*` rule — even on web-rooted
   * monorepos where the entry-point `package.json` is Next / Vite /
   * Remix but a sibling workspace (`apps/mobile`, `packages/native-ui`)
   * targets React Native. The file-level package-boundary check in
   * `oxlint-plugin-react-doctor` still keeps the rules silent on the
   * web workspaces.
   *
   * `false` collapses the gate to the legacy "framework is RN" behavior
   * — no `rn-*` rules load for the project at all.
   */
  hasReactNativeWorkspace: boolean;
  /**
   * The declared `expo` package version spec (e.g. `"~51.0.0"`), looked up
   * in the project or any of its workspace packages, or `null` when `expo`
   * isn't a dependency. Doubles as react-doctor's "is this an Expo project?"
   * signal (`expoVersion !== null`) and its SDK-version source — the `expo`
   * major tracks the Expo SDK release one-to-one — paralleling how
   * `reactVersion` models the React runtime.
   *
   * Keyed off the dependency rather than `framework === "expo"` because
   * `detectFramework` returns the first matching package, so a project
   * declaring both `expo` and a web bundler (`vite` / `next`) classifies as
   * the web framework yet is still an Expo project. Drives the `expo`
   * capability in `buildCapabilities` (which gates every Expo-specific
   * rule) and the ported expo-doctor checks.
   */
  expoVersion: string | null;
  /**
   * The declared `@shopify/flash-list` package version spec, or `null` when
   * absent. FlashList v2 removed the need for `estimatedItemSize`, so this
   * lets the RN list sizing rule stay scoped to versions where the prop is
   * still useful.
   */
  shopifyFlashListVersion: string | null;
  /** Parsed major from `shopifyFlashListVersion`, or `null` when absent/unparseable. */
  shopifyFlashListMajorVersion: number | null;
  /**
   * `true` when the project (or any of its workspace packages) declares
   * `react-native-reanimated`. Lets diagnostics surface reanimated's
   * Compiler-compatible `.get()` / `.set()` accessors only where they
   * apply, instead of on every React Native project.
   */
  hasReanimated: boolean;
  sourceFileCount: number;
}
//#endregion
//#region src/types/score.d.ts
type RuleTier = "P0" | "P1" | "P2" | "P3";
interface RulePriority {
  readonly priority: number | null;
  readonly tier: RuleTier;
}
interface ScoreResult {
  score: number;
  label: string;
  readonly rules?: Readonly<Record<string, RulePriority>>;
} //#endregion
//#region src/types/diagnose.d.ts
interface DiagnoseOptions {
  lint?: boolean;
  /** See `ReactDoctorConfig.deadCode`. Ignored in diff mode. */
  deadCode?: boolean;
  verbose?: boolean;
  includePaths?: string[];
  /**
   * Per-call override for `ReactDoctorConfig.respectInlineDisables`.
   * See that field's docs for the full contract.
   */
  respectInlineDisables?: boolean;
  /**
   * Per-call override for `ReactDoctorConfig.warnings`. See that field's
   * docs — `"warning"`-severity diagnostics surface by default unless this
   * (or the config) opts out via `false`.
   */
  warnings?: boolean;
}
interface DiagnoseResult {
  diagnostics: Diagnostic[];
  score: ScoreResult | null;
  /**
   * Checks that did not run to completion (e.g. `"dead-code"` when the
   * `deslop-js` native binding crashed). Empty when everything ran.
   * Mirrors `InspectResult.skippedChecks`.
   */
  skippedChecks: string[];
  /** See `InspectResult.skippedCheckReasons`. */
  skippedCheckReasons?: Record<string, string>;
  project: ProjectInfo;
  elapsedMilliseconds: number;
}
/**
 * A single project to scan as part of a `diagnoseProjects()` batch.
 * Scan options (`deadCode`, `lint`, etc.) are flat on the entry and
 * layer on top of the global defaults — omitted fields fall through.
 * `config` is a full `ReactDoctorConfig` override that replaces the
 * on-disk `doctor.config.*` for this project's scan.
 */
//#endregion
//#region src/types/inspect.d.ts
interface InspectResult {
  diagnostics: Diagnostic[];
  score: ScoreResult | null;
  skippedChecks: string[];
  /**
   * Human-readable explanation for each entry in `skippedChecks`. Keyed
   * by check name (e.g. `"lint"`). Optional so existing consumers that
   * only read `skippedChecks` keep working unchanged — but JSON output
   * and CI integrations should prefer this for diagnostic clarity
   * (e.g. distinguishing "oxlint native binding missing" from "oxlint
   * spawn timed out on a large project").
   */
  skippedCheckReasons?: Record<string, string>;
  project: ProjectInfo;
  elapsedMilliseconds: number;
  /**
   * Number of files the scan reported. Distinct from
   * `project.sourceFileCount` in diff / staged mode (where only changed
   * files are scanned). Optional so non-orchestrator constructors keep
   * working; the multi-project summary falls back to
   * `project.sourceFileCount` when absent.
   */
  scannedFileCount?: number;
  /**
   * Absolute paths of every file the scan considered. Lets the
   * multi-project summary count UNIQUE files across projects instead of
   * summing per-project counts, which double-counts shared files when one
   * workspace package's tree is nested inside another's.
   */
  scannedFilePaths?: ReadonlyArray<string>;
  /**
   * Wall-clock duration of the scan phase, in milliseconds. Distinct
   * from `elapsedMilliseconds` (which spans the full `inspect()` call
   * including score fetch + rendering). Used by the multi-project
   * summary to report combined scan time.
   */
  scanElapsedMilliseconds?: number;
}
/**
 * Options accepted by `inspect()`. Mixes two concern groups; ordered
 * here in the source to make the split visible to future readers:
 *
 *   - **Engine inputs** (`lint`, `deadCode`, `includePaths`,
 *     `configOverride`, `respectInlineDisables`) — flow into
 *     `runInspect`'s `InspectInput` and shape what the engine
 *     actually does.
 *   - **Rendering / orchestration knobs** (`scoreOnly`, `noScore`,
 *     `silent`, `verbose`, `outputSurface`, `isCi`) — consumed by
 *     the public-API shell to decide what to print, which surface
 *     to filter for, and whether to mark the run as CI-originated.
 *
 * A full type split was investigated as the plan's T4 follow-up but
 * deferred — every call site builds the union anyway, so the gain
 * was purely documentary. Grouping the fields here captures the
 * same intent without churning a published-API type.
 */
interface DiffInfo {
  /**
   * `null` when `HEAD` is detached (e.g. GitHub Actions `pull_request`
   * runs that check out `refs/pull/N/merge`). The diff itself still
   * resolves via `git merge-base <base> HEAD`; callers should render
   * this case as `"(detached HEAD)"` or similar.
   */
  currentBranch: string | null;
  baseBranch: string;
  changedFiles: string[];
  isCurrentChanges?: boolean;
}
type JsonReportMode = "full" | "diff" | "staged";
interface JsonReportDiffInfo {
  baseBranch: string;
  /** `null` when `HEAD` is detached — see `DiffInfo.currentBranch`. */
  currentBranch: string | null;
  changedFileCount: number;
  isCurrentChanges: boolean;
}
interface JsonReportProjectEntry {
  directory: string;
  project: ProjectInfo;
  diagnostics: Diagnostic[];
  score: ScoreResult | null;
  skippedChecks: string[];
  /** Human-readable explanation per skipped check. See `InspectResult.skippedCheckReasons`. */
  skippedCheckReasons?: Record<string, string>;
  elapsedMilliseconds: number;
}
interface JsonReportSummary {
  errorCount: number;
  warningCount: number;
  affectedFileCount: number;
  totalDiagnosticCount: number;
  score: number | null;
  scoreLabel: string | null;
}
interface JsonReportError {
  message: string;
  name: string;
  chain: string[];
}
interface JsonReport {
  schemaVersion: 1;
  version: string;
  ok: boolean;
  directory: string;
  mode: JsonReportMode;
  diff: JsonReportDiffInfo | null;
  projects: JsonReportProjectEntry[];
  /**
   * Flattened across `projects[].diagnostics` for convenience. Equivalent to
   * `projects.flatMap((project) => project.diagnostics)`.
   */
  diagnostics: Diagnostic[];
  summary: JsonReportSummary;
  elapsedMilliseconds: number;
  error: JsonReportError | null;
} //#endregion
//#region src/types/prompts.d.ts
//#endregion
//#region src/project-info/errors.d.ts
/**
 * Narrow errors raised by the project-discovery helpers
 * (`discoverProject` / `resolveDiagnoseTarget` / `readPackageJson`).
 *
 * These extend `Error` directly — they are NOT the tagged
 * `ReactDoctorError` from `../errors.js` (that one wraps every
 * runtime-pipeline failure as a `Schema.TaggedErrorClass` for
 * `Effect.catchReasons` dispatch). The split is intentional:
 *
 * - Discovery happens BEFORE the Effect runtime takes over — at the
 *   `diagnose()` / CLI entry point — and throws plain JS exceptions
 *   so callers can `try/catch` without an Effect-layer-aware
 *   `instanceof` check.
 * - The Project service (`services/project.ts → translateProjectInfoError`)
 *   translates each of these into the equivalent tagged-error
 *   `reason` before re-raising inside the Effect pipeline, so the
 *   runtime never sees a non-tagged failure.
 *
 * If you're inside the Effect runtime, use the tagged
 * `ReactDoctorError` from `../errors.js` instead.
 */
/**
 * Distinguishes the two situations that both surface as "no project here", so
 * the rendered message matches reality:
 *
 * - `no-project` (default): the path exists but has no React project — no
 *   `package.json` at the root and no discoverable nested React subproject.
 * - `missing-path`: the resolved scan target does not exist on disk at all
 *   (a typo, a stale temp path, a monorepo subdir that isn't present). The
 *   generic "expected a package.json" guidance is misleading here, so point
 *   at the missing path instead.
 */
interface ProjectNotFoundOptions extends ErrorOptions {
  readonly kind?: "no-project" | "missing-path";
}
declare class ProjectNotFoundError extends Error {
  readonly name = "ProjectNotFoundError";
  readonly directory: string;
  readonly kind: "no-project" | "missing-path";
  constructor(directory: string, options?: ProjectNotFoundOptions);
}
declare class NoReactDependencyError extends Error {
  readonly name = "NoReactDependencyError";
  readonly directory: string;
  constructor(directory: string, options?: ErrorOptions);
}
declare class PackageJsonNotFoundError extends Error {
  readonly name = "PackageJsonNotFoundError";
  readonly directory: string;
  constructor(directory: string, options?: ErrorOptions);
}
declare class NotADirectoryError extends Error {
  readonly name = "NotADirectoryError";
  readonly resolvedPath: string;
  constructor(resolvedPath: string, options?: ErrorOptions);
}
declare class AmbiguousProjectError extends Error {
  readonly name = "AmbiguousProjectError";
  readonly directory: string;
  readonly candidates: readonly string[];
  constructor(directory: string, candidates: readonly string[], options?: ErrorOptions);
}
declare const isProjectDiscoveryError: (value: unknown) => value is ProjectNotFoundError | NoReactDependencyError | PackageJsonNotFoundError | NotADirectoryError | AmbiguousProjectError; //#endregion
//#region src/project-info/utils/is-directory.d.ts
//#endregion
//#region src/errors.d.ts
declare const OxlintUnavailable_base: Schema.Class<OxlintUnavailable, Schema.TaggedStruct<"OxlintUnavailable", {
  readonly kind: Schema.Literals<readonly ["binary-not-found", "native-binding-missing"]>;
  readonly detail: Schema.String;
}>, Cause.YieldableError>;
declare class OxlintUnavailable extends OxlintUnavailable_base {
  get message(): string;
}
declare const OxlintBatchExceeded_base: Schema.Class<OxlintBatchExceeded, Schema.TaggedStruct<"OxlintBatchExceeded", {
  readonly kind: Schema.Literals<readonly ["timeout", "output-too-large", "oom", "killed"]>;
  readonly detail: Schema.String;
}>, Cause.YieldableError>;
declare class OxlintBatchExceeded extends OxlintBatchExceeded_base {
  get message(): string;
}
declare const OxlintSpawnFailed_base: Schema.Class<OxlintSpawnFailed, Schema.TaggedStruct<"OxlintSpawnFailed", {
  readonly cause: Schema.Unknown;
}>, Cause.YieldableError>;
declare class OxlintSpawnFailed extends OxlintSpawnFailed_base {
  get message(): string;
}
declare const OxlintOutputUnparseable_base: Schema.Class<OxlintOutputUnparseable, Schema.TaggedStruct<"OxlintOutputUnparseable", {
  readonly preview: Schema.String;
}>, Cause.YieldableError>;
declare class OxlintOutputUnparseable extends OxlintOutputUnparseable_base {
  get message(): string;
}
declare const ConfigParseFailed_base: Schema.Class<ConfigParseFailed, Schema.TaggedStruct<"ConfigParseFailed", {
  readonly path: Schema.String;
  readonly cause: Schema.Unknown;
}>, Cause.YieldableError>;
declare class ConfigParseFailed extends ConfigParseFailed_base {
  get message(): string;
}
declare const ProjectNotFound_base: Schema.Class<ProjectNotFound, Schema.TaggedStruct<"ProjectNotFound", {
  readonly directory: Schema.String;
}>, Cause.YieldableError>;
declare class ProjectNotFound extends ProjectNotFound_base {
  get message(): string;
}
declare const NoReactDependency_base: Schema.Class<NoReactDependency, Schema.TaggedStruct<"NoReactDependency", {
  readonly directory: Schema.String;
}>, Cause.YieldableError>;
declare class NoReactDependency extends NoReactDependency_base {
  get message(): string;
}
declare const AmbiguousProject_base: Schema.Class<AmbiguousProject, Schema.TaggedStruct<"AmbiguousProject", {
  readonly directory: Schema.String;
  readonly candidates: Schema.$Array<Schema.String>;
}>, Cause.YieldableError>;
declare class AmbiguousProject extends AmbiguousProject_base {
  get message(): string;
}
declare const DeadCodeAnalysisFailed_base: Schema.Class<DeadCodeAnalysisFailed, Schema.TaggedStruct<"DeadCodeAnalysisFailed", {
  readonly cause: Schema.Unknown;
}>, Cause.YieldableError>;
declare class DeadCodeAnalysisFailed extends DeadCodeAnalysisFailed_base {
  get message(): string;
}
declare const GitInvocationFailed_base: Schema.Class<GitInvocationFailed, Schema.TaggedStruct<"GitInvocationFailed", {
  readonly args: Schema.$Array<Schema.String>;
  readonly directory: Schema.String;
  readonly cause: Schema.Unknown;
}>, Cause.YieldableError>;
declare class GitInvocationFailed extends GitInvocationFailed_base {
  get message(): string;
}
declare const GitBaseBranchMissing_base: Schema.Class<GitBaseBranchMissing, Schema.TaggedStruct<"GitBaseBranchMissing", {
  readonly branch: Schema.String;
}>, Cause.YieldableError>;
declare class GitBaseBranchMissing extends GitBaseBranchMissing_base {
  get message(): string;
}
declare const GitBaseBranchInvalid_base: Schema.Class<GitBaseBranchInvalid, Schema.TaggedStruct<"GitBaseBranchInvalid", {
  readonly detail: Schema.String;
}>, Cause.YieldableError>;
declare class GitBaseBranchInvalid extends GitBaseBranchInvalid_base {
  get message(): string;
}
declare const ReactDoctorError_base: Schema.Class<ReactDoctorError, Schema.TaggedStruct<"ReactDoctorError", {
  readonly reason: Schema.Union<readonly [typeof OxlintUnavailable, typeof OxlintBatchExceeded, typeof OxlintSpawnFailed, typeof OxlintOutputUnparseable, typeof ConfigParseFailed, typeof ProjectNotFound, typeof NoReactDependency, typeof AmbiguousProject, typeof DeadCodeAnalysisFailed, typeof GitInvocationFailed, typeof GitBaseBranchMissing, typeof GitBaseBranchInvalid]>;
}>, Cause.YieldableError>;
declare class ReactDoctorError extends ReactDoctorError_base {
  get message(): string;
}
declare const isReactDoctorError: (error: unknown) => error is ReactDoctorError;
/**
 * Tagged-reason → legacy thrown-class boundary shared by every public
 * shell (`inspect()` in `react-doctor`, `diagnose()` in `@react-doctor/api`).
 *
 * `Effect.catchReasons` dispatches on the tagged-error sub-channel
 * without manual `instanceof` checks. Each handler converts a tagged
 * reason into the historical thrown class advertised by the legacy
 * public-API contract (via `Effect.die`, which `Effect.runPromise`
 * re-throws unchanged). The `orElse` branch re-`die`s the original
 * `ReactDoctorError` instance so advanced callers can still narrow on
 * `error.reason._tag` while grep-stderr users keep the same
 * `error.message` they always saw.
 *
 * Adding a new legacy thrown class is a one-line change on the
 * `Effect.catchReasons` map — both shells pick it up automatically.
 */
//#endregion
//#region src/build-json-report-error.d.ts
interface BuildJsonReportErrorInput {
  version: string;
  directory: string;
  error: unknown;
  elapsedMilliseconds: number;
  mode?: JsonReportMode;
}
declare const buildJsonReportError: (input: BuildJsonReportErrorInput) => JsonReport; //#endregion
//#region src/build-json-report.d.ts
interface BuildJsonReportInput {
  version: string;
  directory: string;
  mode: JsonReportMode;
  diff: DiffInfo | null;
  scans: Array<{
    directory: string;
    result: InspectResult;
  }>;
  totalElapsedMilliseconds: number;
}
declare const buildJsonReport: (input: BuildJsonReportInput) => JsonReport; //#endregion
//#region src/build-skipped-checks.d.ts
//#endregion
//#region src/get-diff-files.d.ts
/**
 * Programmatic façade over `Git.diffSelection`. Async because the
 * Git service runs through Effect's `ChildProcess` (true subprocess
 * spawn, not `spawnSync`).
 *
 * Failures propagate as the tagged `ReactDoctorError` (rejected by
 * `Effect.runPromise`) rather than being flattened into a plain
 * `Error`. The message is unchanged — `ReactDoctorError.message`
 * defers to `reason.message` — so message-matching callers keep
 * working, while the CLI can now dispatch on `error.reason._tag` to
 * render diff-base mistakes (`GitBaseBranchInvalid` /
 * `GitBaseBranchMissing`) as clean user errors instead of crashes.
 */
declare const getDiffInfo: (directory: string, explicitBaseBranch?: string, options?: {
  readonly useParentBranch?: boolean;
}) => Promise<DiffInfo | null>;
declare const filterSourceFiles: (filePaths: string[]) => string[]; //#endregion
//#region ../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/types.d.ts
//#endregion
//#region src/summarize-diagnostics.d.ts
declare const summarizeDiagnostics: (diagnostics: Diagnostic[], worstScore?: number | null, worstScoreLabel?: string | null) => JsonReportSummary; //#endregion
//#region src/validate-config-types.d.ts
//#endregion
//#region ../api/dist/index.d.ts
//#region src/diagnose.d.ts
declare const diagnose: (directory: string, options?: DiagnoseOptions) => Promise<DiagnoseResult>;
/**
 * Scan multiple projects in parallel and return per-project scores,
 * diagnostics, and an aggregate score (worst-of across all projects).
 *
 * Each project runs its own independent `runInspect` pipeline — the
 * same pipeline `diagnose()` uses — so per-project config overrides,
 * dead-code analysis, and scoring all work identically to a single
 * `diagnose()` call.
 *
 * Projects that fail (e.g. missing `package.json`, no React dependency)
 * are included in the result with `ok: false` rather than aborting the
 * entire batch, so callers always receive partial results.
 *
 * ```ts
 * const result = await diagnoseProjects({
 *   projects: [
 *     { directory: "packages/app" },
 *     { directory: "packages/shared", deadCode: false },
 *     { directory: "packages/admin", config: {
 *       rules: { "react-doctor/no-array-index-as-key": "off" },
 *     }},
 *   ],
 *   concurrency: 4,
 * });
 *
 * for (const project of result.projects) {
 *   if (project.ok) {
 *     console.log(project.directory, project.score);
 *   } else {
 *     console.error(project.directory, project.error);
 *   }
 * }
 * ```
 */
//#endregion
//#region src/index.d.ts
declare const clearCaches: () => void;
interface ToJsonReportOptions {
  version: string;
  directory?: string;
  mode?: JsonReportMode;
}
declare const toJsonReport: (result: DiagnoseResult, options: ToJsonReportOptions) => JsonReport;
//#endregion
export { AmbiguousProjectError, type DiagnoseOptions, type DiagnoseResult, type Diagnostic, type DiffInfo, type JsonReport, type JsonReportDiffInfo, type JsonReportError, type JsonReportMode, type JsonReportProjectEntry, type JsonReportSummary, NoReactDependencyError, NotADirectoryError, PackageJsonNotFoundError, type ProjectInfo, ProjectNotFoundError, type ReactDoctorConfig, ReactDoctorError, type ScoreResult, buildJsonReport, buildJsonReportError, clearCaches, diagnose, filterSourceFiles, getDiffInfo, isProjectDiscoveryError, isReactDoctorError, summarizeDiagnostics, toJsonReport };
//# sourceMappingURL=index.d.ts.map