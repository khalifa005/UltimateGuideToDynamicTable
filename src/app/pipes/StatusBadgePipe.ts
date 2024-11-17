// status-badge.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusBadge'
})
export class StatusBadgePipe implements PipeTransform {
    transform(status: string): string {
        let badgeColor = '';
        let badgeText = status;

        switch (status.toLowerCase()) {
            case 'pending':
                badgeColor = 'background-color: #f0ad4e; color: white;'; // Yellow
                break;
            case 'shipped':
                badgeColor = 'background-color: #0275d8; color: white;'; // Blue
                break;
            case 'delivered':
                badgeColor = 'background-color: #5cb85c; color: white;'; // Green
                break;
            case 'cancelled':
                badgeColor = 'background-color: #d9534f; color: white;'; // Red
                break;
            default:
                badgeColor = 'background-color: #d6d8db; color: #6c757d;'; // Light gray with dark gray text
                badgeText = 'Unknown Status';
                break;
        }

        return `<span style="padding: 5px 10px; border-radius: 5px; font-size: 12px; ${badgeColor}">${badgeText}</span>`;
    }
}
