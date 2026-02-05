import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';
import { PoliesModule } from './polies/polies.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentModule } from './appointment/appointment.module';
import { DrugsModule } from './drugs/drugs.module';
import { MastersModule } from './master/master.module';

@Module({
  imports: [AuthModule, AppointmentsModule, MastersModule, UsersModule, PoliesModule, DoctorsModule, AppointmentModule, DrugsModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
