export function calcMatchRating(
  placement: number,
  numberOfPlayers: number,
  averageScore: number
): number {
  const placementWeight = 1 / placement; // Je niedriger das Placement, desto höher das Gewicht
  const playerCountWeight = numberOfPlayers / 10; // Je mehr Spieler, desto höher das Gewicht (angepasst an deine Anforderungen)
  const scoreWeight = averageScore / 100; // Je höher die durchschnittliche Punktzahl, desto höher das Gewicht (angepasst an deine Anforderungen)

  // Hier kannst du die Gewichtungen nach Bedarf anpassen und kombinieren
  const rating = placementWeight + playerCountWeight + scoreWeight;

  return rating;
}
