// Model 1
export type NodeDatum = {
  id: string;
  label: string;
  shape: string;
  color: string;
}

export type LinkDatum = {
  id: string;
  source: string;
  target: string;
  active: boolean;
  color: string;
}

export type GraphData = {
  nodes: NodeDatum[];
  links: LinkDatum[];
}

export const links: LinkDatum[] = []
export const nodes: NodeDatum[] = []
export const dataModel1: GraphData = { nodes, links }
