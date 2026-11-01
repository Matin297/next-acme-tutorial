type DatabaseError = {
  sqlState?: string;
};

export function isUniqueConstraintViolation(error: unknown) {
  return (error as DatabaseError).sqlState === "23505";
}
