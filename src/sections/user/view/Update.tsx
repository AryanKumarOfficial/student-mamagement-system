// EditStudentDialog.tsx
import React, { useState, useEffect } from 'react';

import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  DialogContentText,
} from '@mui/material';

import { z } from 'zod';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { StudentProps } from '../../../store/studentStore';

import useStudentStore from '../../../store/studentStore';

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email').nonempty('Email is required'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be 10 digits')
    .nonempty('Phone number is required'),
  class: z.string().nonempty('Class is required'),
  section: z.string().nonempty('Section is required'),
  roll: z.string().nonempty('Roll number is required'),
  school: z.string().nonempty('School is required'),
  gender: z.string().nonempty('Gender is required'),
  status: z.string().nonempty('Status is required'),
  grade: z.string().nonempty('Grade is required'),
  address: z.string().nonempty('Address is required'),
  date: z
    .date()
    .nullable()
    .refine((date) => date !== null, { message: 'Date is required' }),
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  class: string;
  section: string;
  roll: string;
  school: string;
  gender: string;
  status: string;
  grade: string;
  address: string;
  date: Date | null;
}

export function EditStudentDialog({
  open,
  onClose,
  student,
}: {
  open: boolean;
  onClose: () => void;
  student: StudentProps | null;
}) {
  const [formData, setFormData] = useState<StudentProps | null>(student);
  const { updateStudent } = useStudentStore();
  useEffect(() => {
    console.log('students ', student);
  }, [student]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: student?.name ?? '',
      email: student?.email ?? '',
      phone: student?.phone ?? '',
      class: student?.class ?? '',
      section: student?.section ?? '',
      roll: student?.roll ?? '',
      school: student?.school ?? '',
      gender: student?.gender ?? '',
      status: student?.status ?? '',
      grade: student?.grade ?? '',
      address: student?.address ?? '',
      date: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log('Data:', data);
    try {
      await updateStudent(data, String(student?.id));
      toast.success('Student updated successfully.');
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update student.');
    } finally {
      reset();
    }
  };

  const renderTextField = (name: keyof FormData, label: string, type = 'text') => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          margin="dense"
          multiline={name === 'address'}
          label={label}
          type={type}
          rows={name === 'address' ? 4 : 1}
          fullWidth
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  );

  const renderSelectField = (
    name: keyof FormData,
    label: string,
    options: { value: string; label: string }[]
  ) => (
    <FormControl fullWidth margin="dense" error={!!errors[name]}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} label={label}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <p style={{ color: 'red' }}>{errors[name]?.message}</p>
    </FormControl>
  );

  if (!formData) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>Add New Student Record</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new student record, please enter the details of the student below.
        </DialogContentText>
        {renderTextField('name', 'Name')}
        {renderTextField('email', 'Email Address', 'email')}
        {renderTextField('phone', 'Phone Number')}
        {renderTextField('class', 'Class')}
        {renderTextField('section', 'Section')}
        {renderTextField('roll', 'Roll Number')}
        {renderTextField('school', 'School')}
        {renderSelectField('gender', 'Gender', [
          { value: '', label: 'Select Gender' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'others', label: 'Others' },
        ])}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Date of Birth"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toDate() || null)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'dense',
                    error: !!errors.date,
                    helperText: errors.date?.message,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
        {renderSelectField('status', 'Status', [
          { value: '', label: 'Select Status' },
          { value: 'alumni', label: 'Alumni' },
          { value: 'pursuing', label: 'Pursuing' },
        ])}
        {renderTextField('address', 'Address')}
        {renderSelectField('grade', 'Grade', [
          { value: '', label: 'Select Grade' },
          { value: 'A+', label: 'A+' },
          { value: 'A', label: 'A' },
          { value: 'B+', label: 'B+' },
          { value: 'B', label: 'B' },
          { value: 'C+', label: 'C+' },
          { value: 'C', label: 'C' },
          { value: 'D+', label: 'D+' },
          { value: 'D', label: 'D' },
          { value: 'E', label: 'E' },
        ])}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Discard</Button>
        <Button type="submit">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
