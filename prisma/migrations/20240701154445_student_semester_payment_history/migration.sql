-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'ONLINE');

-- CreateTable
CREATE TABLE "student_semester_payment_histories" (
    "id" TEXT NOT NULL,
    "studentSemesterPaymentId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "dueAmount" INTEGER NOT NULL DEFAULT 0,
    "paidAmount" INTEGER NOT NULL DEFAULT 0,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'ONLINE',
    "isPaid" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_semester_payment_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_semester_payment_histories" ADD CONSTRAINT "student_semester_payment_histories_studentSemesterPaymentI_fkey" FOREIGN KEY ("studentSemesterPaymentId") REFERENCES "student_semester_payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
