import {
  DefaultResources,
  Namespace,
  Normalize,
  NormalizeMulti,
} from 'react-i18next';

export type NamespaceKey<N extends Namespace> = N extends
  | (keyof DefaultResources)[]
  | Readonly<(keyof DefaultResources)[]>
  ? NormalizeMulti<DefaultResources, N[number]>
  : N extends keyof DefaultResources
  ? Normalize<DefaultResources[N]>
  : never;
