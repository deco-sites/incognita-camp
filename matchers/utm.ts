import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  campaign: string;
}

/**
 * @title UTM Campaign
 * @description Match with a utm campaign
 * @icon hand-click
 */
export default function Utm({ campaign }: Props, ctx: MatchContext) {
  const url = new URL(ctx.request.url);
  return url.searchParams.get("utmcampaign") === campaign;
}
