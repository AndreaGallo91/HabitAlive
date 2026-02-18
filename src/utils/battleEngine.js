export function calculateBattleResult(pet, enemy) {
  const petDamage = pet.power * (pet.energy / 100) * (1 + pet.mood / 200);
  const petHP = 100 + pet.level * 20;

  const enemyHP = enemy.hp;
  const enemyPower = enemy.power;

  let currentPetHP = petHP;
  let currentEnemyHP = enemyHP;
  const turns = [];
  let turn = 0;

  while (currentPetHP > 0 && currentEnemyHP > 0 && turn < 20) {
    turn++;
    
    const petHit = petDamage * (0.8 + Math.random() * 0.4);
    currentEnemyHP -= petHit;
    turns.push({
      turn,
      attacker: 'pet',
      damage: Math.round(petHit),
      petHP: Math.max(0, Math.round(currentPetHP)),
      enemyHP: Math.max(0, Math.round(currentEnemyHP)),
    });

    if (currentEnemyHP <= 0) break;

    const enemyHit = enemyPower * (0.8 + Math.random() * 0.4);
    currentPetHP -= enemyHit;
    turns.push({
      turn,
      attacker: 'enemy',
      damage: Math.round(enemyHit),
      petHP: Math.max(0, Math.round(currentPetHP)),
      enemyHP: Math.max(0, Math.round(currentEnemyHP)),
    });
  }

  return {
    victory: currentEnemyHP <= 0,
    turns,
    finalPetHP: Math.max(0, Math.round(currentPetHP)),
    finalEnemyHP: Math.max(0, Math.round(currentEnemyHP)),
    totalTurns: turn,
    petMaxHP: petHP,
    enemyMaxHP: enemyHP,
  };
}
