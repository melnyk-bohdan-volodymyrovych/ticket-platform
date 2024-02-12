-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "barcode" TEXT NOT NULL,
    "serviceFee" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "buyerPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "promoterReceivesPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
